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

class CurrentWalkViewController: UIViewController, CLLocationManagerDelegate {
    var running = false;
    let locationMgr: CLLocationManager = CLLocationManager();
    var walkLocations: [CLLocation] = [];
    var appDelegate: AppDelegate?
    var context: NSManagedObjectContext?
    var entity: NSEntityDescription?
    let motionMgr = CMMotionManager()
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
        goalProgressBar.layer.cornerRadius = 4
        goalProgressBar.clipsToBounds = true
        goalProgressBar.progressTintColor = UIColor(displayP3Red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)
        stopButtonOutlet.layer.cornerRadius = 5
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
        locationMgr.delegate = self as? CLLocationManagerDelegate
        locationMgr.allowsBackgroundLocationUpdates = true
        
        running = true
        walkStats = WalkStats()
        goalVibeDone = false
        timeCounter = 0.0
        timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(UpdateTimer), userInfo: nil, repeats: true)
        
        if !startReceivingLocationChanges() {
            //durationLabel.text = "Error getting location. Please ensure that location services are enabled."
            print("Error getting location updates")
            return
        }
        if !startRecievingPedometerChanges() {
            //stepsLabel.text = "Error getting pedometer data. Please ensure that motion permissions are enabled."
            print("Error getting pedometer updates")
            //return
        }
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
        if goalType == "minutes" {
            let pctProgress = Float(timeCounter)/Float(goalValue*60)
            goalProgressBar.progress = pctProgress
            setProgressColour(pctProgress)
            if pctProgress >= 1.0 && !self.goalVibeDone {
                AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
                self.goalVibeDone = true
            }
        }
        durationLabel.text = String(dcFormatter.string(from: timeCounter as TimeInterval)!)
    }
    
    func setProgressColour(_ pctProgress: Float) {
        print(pctProgress)
        if pctProgress < 0.33 {
            goalProgressBar.progressTintColor = UIColor(displayP3Red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)
        } else if pctProgress < 0.66 {
            goalProgressBar.progressTintColor = UIColor(red:1.00, green:0.49, blue:0.00, alpha:1.0)
        } else if pctProgress < 0.85 {
            goalProgressBar.progressTintColor = UIColor(displayP3Red: 1.0, green: 215.0/255.0, blue: 0.0, alpha: 1.0)
        } else {
            goalProgressBar.progressTintColor = UIColor(displayP3Red: 127.0/255.0, green: 1.0, blue: 0.0, alpha: 1.0)
        }
    }
    
    func startReceivingLocationChanges() -> Bool {
        let authStatus = CLLocationManager.authorizationStatus()
        if authStatus != .authorizedWhenInUse && authStatus != .authorizedAlways {
            print("Location status not authorised")
            return false
        }
        
        if !CLLocationManager.locationServicesEnabled() {
            print("Location services disabled")
            return false
        }
        
        locationMgr.desiredAccuracy = kCLLocationAccuracyBest
        locationMgr.distanceFilter = 15.0
        print("Starting to get location updates")
        locationMgr.requestAlwaysAuthorization()
        locationMgr.startUpdatingLocation()
        return true
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]){
        let lastLocation = locations.last!
        filterAndAddLocation(lastLocation)
        
        let distance = Int(walkStats!.getDistanceFromWalks())
        distanceLabel.text = String(distance) + " meters"
        distancePaceLabel.text = distance > 0 ? String(format: "%.2f m/s", Double(distance)/self.timeCounter) : "0 m/s"
        if goalType == "distance" {
            let pctProgress = Float(distance)/Float(goalValue)
            goalProgressBar.progress = pctProgress
            setProgressColour(pctProgress)
            if pctProgress >= 1.0 && !self.goalVibeDone {
                AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
                self.goalVibeDone = true
            }
        }
        
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Location updates failed with error")
        print(error)
    }
    
    //Author Taka Mizutori
    //Source: https://medium.com/@mizutori/make-it-even-better-than-nike-how-to-filter-locations-tracking-highly-accurate-location-in-774be045f8d6
    func filterAndAddLocation(_ location: CLLocation) {
        let age = -location.timestamp.timeIntervalSinceNow
        
        if age > 10 {
            return
        }
        
        if location.horizontalAccuracy < 0{
            return
        }
        
        if location.horizontalAccuracy > 100{
            return
        }
        
        walkStats!.addWalkLocation(location: location)
        
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
                        self!.setProgressColour(pctDone)
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
