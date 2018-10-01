//
//  CurrentWalkViewController.swift
//  WalkAroundTheBlock
//
//  Created by Heinrich Malan on 1/10/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import UIKit
import CoreLocation
import CoreData
import CoreMotion
import AVFoundation

class CurrentWalkViewController: UIViewController {
    var running = true;
    let locationMgr = CLLocationManager();
    var walkLocations: [CLLocation] = [];
    var appDelegate: AppDelegate?
    var context: NSManagedObjectContext?
    var entity: NSEntityDescription?
    let pedometer = CMPedometer()
    var goalVibeDone = false
    var goalType: String = "distance"
    var goalValue: Int = 0
    var walkStats: WalkStats?
    var timer: Timer?
    var timeCounter: Double = 0.0
    
    // MARK: Properties
    @IBOutlet weak var stepCountLabel: UILabel!
    @IBOutlet weak var durationLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!
    @IBOutlet weak var distancePaceLabel: UILabel!
    @IBOutlet weak var stepPaceLabel: UILabel!
    @IBOutlet weak var goalProgressBar: UIProgressView!
    @IBOutlet weak var stopButtonOutlet: UIButton!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
        locationMgr.allowsBackgroundLocationUpdates = true
        if !startReceivingLocationChanges() {
            //durationLabel.text = "Error getting location. Please ensure that location services are enabled."
            print("Error getting location updates")
            return
        }
        if !startRecievingPedometerChanges() {
            //stepsLabel.text = "Error getting pedometer data. Please ensure that motion permissions are enabled."
            print("Error getting pedometer updates")
            return
        }
        
        walkStats = WalkStats()
        running = true
        goalVibeDone = false
        timeCounter = 0.0
        timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(UpdateTimer), userInfo: nil, repeats: true)
        // Do any additional setup after loading the view.
    }
    
    @IBAction func stopButton(_ sender: Any) {
        if running {
            locationMgr.stopUpdatingLocation()
            timer!.invalidate()
            pedometer.stopUpdates()
            running = false
            walkStats!.endWalk()
            stopButtonOutlet.setTitle("Start New Walk", for: .normal)
            saveWalk()
            
        } else {
            dismiss(animated: true, completion: nil)
        }
    }
    
    
    @objc func UpdateTimer() {
        
        let dcFormatter = DateComponentsFormatter()
        dcFormatter.unitsStyle = .full
        dcFormatter.allowedUnits = [.minute, .second, .hour]
        timeCounter += 1
        durationLabel.text = String(dcFormatter.string(from: timeCounter as TimeInterval)!)
    }
    
    func startReceivingLocationChanges() -> Bool {
        let authStatus = CLLocationManager.authorizationStatus()
        if authStatus != .authorizedWhenInUse && authStatus != .authorizedAlways {
            return false
        }
        
        if !CLLocationManager.locationServicesEnabled() {
            return false
        }
        
        locationMgr.desiredAccuracy = kCLLocationAccuracyBest
        locationMgr.distanceFilter = 15.0
        locationMgr.delegate = self as? CLLocationManagerDelegate
        locationMgr.startUpdatingLocation()
        return true
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]){
        let lastLocation = locations.last!
        if lastLocation.timestamp.timeIntervalSince(walkStats!.getStartTime()) >= 0 {
            print("Location retrieved")
            filterAndAddLocation(lastLocation)
        }
        
        let distance = Int(walkStats!.getDistanceFromWalks())
        distanceLabel.text = String(distance) + " meters"
        distancePaceLabel.text = distance > 0 ? String(format: "%.2f m/s", Double(distance)/self.timeCounter) : "0 m/s"
        if goalType == "distance" {
            let pctProgress = Float(distance)/Float(goalValue)
            goalProgressBar.progress = pctProgress
            if pctProgress >= 1.0 && !self.goalVibeDone {
                AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
                self.goalVibeDone = true
            }
        }
        
    }
    
    //Author Taka Mizutori
    //Source: https://medium.com/@mizutori/make-it-even-better-than-nike-how-to-filter-locations-tracking-highly-accurate-location-in-774be045f8d6
    func filterAndAddLocation(_ location: CLLocation) -> Bool{
        let age = -location.timestamp.timeIntervalSinceNow
        
        if age > 10{
            return false
        }
        
        if location.horizontalAccuracy < 0{
            return false
        }
        
        if location.horizontalAccuracy > 100{
            return false
        }
        
        walkStats!.addWalkLocation(location: location)
        
        return true
        
    }
    
    fileprivate func startRecievingPedometerChanges() -> Bool {
        if CMPedometer.isStepCountingAvailable() {
            pedometer.startUpdates(from: Date()) {
                [weak self] pedometerData, error in
                guard let pedometerData = pedometerData, error == nil else {return}
                
                DispatchQueue.main.async {
                    let numSteps = Int(truncating: pedometerData.numberOfSteps)
                    self!.walkStats!.addSteps(steps: numSteps)
                    self!.stepCountLabel.text = String(numSteps)
                    self!.stepPaceLabel.text = String(format: "%.2f", Double(numSteps)/((self!.timeCounter)/60.0))
                    if self!.goalType == "steps" {
                        let pctDone: Float = Float(numSteps)/Float(self!.goalValue)
                        self!.goalProgressBar.progress = pctDone
                        if pctDone >= 1.0 && !self!.goalVibeDone {
                            AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
                            self!.goalVibeDone = true
                        }
                    }
                }
            }
            return true
        } else {
            return false
        }
    }
    
    fileprivate func saveWalk() {
        let newWalk = NSManagedObject(entity: entity!, insertInto: context!)
        newWalk.setValue(walkStats!.getDuration(), forKey: "duration")
        newWalk.setValue(walkStats!.getSteps(), forKey: "steps")
        newWalk.setValue(walkStats!.getStartTime(), forKey: "date")
        newWalk.setValue(walkStats!.getDistance(), forKey: "distance")
        do {
            try context!.save()
        } catch {
            print("Failed saving")
        }
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

class Time {
    var minutes: Int = 0
    var seconds: Int = 0
    var hours: Int = 0
    var totalSeconds: Int = 0
    
    init(duration: TimeInterval) {
        let truncated = duration.truncatingRemainder(dividingBy: 1.0)
        self.totalSeconds = Int(duration - truncated)
        self.seconds = self.totalSeconds%60
        self.minutes = (self.totalSeconds - self.seconds)/60
        if (self.minutes >= 60) {
            self.hours = (self.minutes - self.minutes%60)/60
            self.minutes = self.minutes%60
        }
    }
}
