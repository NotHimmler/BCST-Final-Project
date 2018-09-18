//
//  ViewController.swift
//  WalkforwardTest
//
//  Created by Heinrich Malan on 6/9/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import UIKit
import CoreLocation
import CoreData
import CoreMotion
import AVFoundation

class ViewController: UIViewController, CLLocationManagerDelegate {
    var running = false;
    let locationMgr = CLLocationManager();
    var startTime: Date?
    var endTime: Date?
    var walkLocations: [CLLocation] = [];
    var appDelegate: AppDelegate?
    var context: NSManagedObjectContext?
    var entity: NSEntityDescription?
    let pedometer = CMPedometer()
    var numSteps = 0
    var metersWalked = 0
    var goalType = "distance"
    var goalValue = 0
    var stepGoal = 0
    var goalVibeDone = false
    var walkStats: WalkStats?
    
    // MARK: Properties
    
    @IBOutlet weak var stepsLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!
    @IBOutlet weak var durationLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var RecordButton: UIButton!
    
    // MARK: Goals
    @IBOutlet weak var stepsGoal: UIView!
    @IBOutlet weak var distanceGoal: UIView!
    @IBOutlet weak var stepsOkayImg: UIImageView!
    @IBOutlet weak var distOkayImg: UIImageView!
    @IBOutlet weak var distMeterGoalTextField: UITextField!
    @IBOutlet weak var goalLabel: UILabel!
    
    @IBOutlet weak var goalProgressBar: UIProgressView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
        RecordButton.backgroundColor = UIColor(red: 76/255.0, green: 217/255.0, blue: 100/255.0, alpha: 1.0)
        setupButtons()
        setUpGoalTextFields()
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:))))
    }
    
    fileprivate func resetUIElements() {
        distMeterGoalTextField.isUserInteractionEnabled = true
        distOkayImg.isUserInteractionEnabled = true
        stepsOkayImg.isUserInteractionEnabled = true
        RecordButton.backgroundColor = UIColor(red: 76/255.0, green: 217/255.0, blue: 100/255.0, alpha: 1.0)
        RecordButton.setTitle("Start Recording", for: .normal)
    }
    
    fileprivate func setUIElementsForRunStart() {
        goalProgressBar.progress = 0.0
        distanceLabel.text = ""
        durationLabel.text = "Logging Your Walk"
        stepsLabel.text = "Number of Steps: " + String(numSteps)
        RecordButton.setTitle("Stop Logging Walk", for: .normal)
        RecordButton.backgroundColor = UIColor(red: 1.0, green: 59/255.0, blue: 48/255.0, alpha: 1.0)
        distMeterGoalTextField.isUserInteractionEnabled = false
        distOkayImg.isUserInteractionEnabled = false
        stepsOkayImg.isUserInteractionEnabled = false
    }
    
    fileprivate func startRecievingPedometerChanges() -> Bool {
        if CMPedometer.isStepCountingAvailable() {
            pedometer.startUpdates(from: Date()) {
                [weak self] pedometerData, error in
                guard let pedometerData = pedometerData, error == nil else {return}
                
                DispatchQueue.main.async {
                    self!.walkStats!.addSteps(steps: Int(truncating: pedometerData.numberOfSteps))
                    self!.stepsLabel.text = "Num Steps: " + String(self!.walkStats!.getSteps())
                    if self!.goalType == "steps" {
                        let pctDone: Float = Float(self!.walkStats!.getSteps())/Float(self!.goalValue)
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
        newWalk.setValue(startTime!, forKey: "date")
        newWalk.setValue(walkStats!.getDistance(), forKey: "distance")
        do {
            try context!.save()
        } catch {
            print("Failed saving")
        }
    }
    
    @IBAction func ButtonClickHandler(_ sender: Any) {
        if (!running) {
            walkStats = WalkStats()
            startTime = Date()
            running = true
            goalVibeDone = false
            setUIElementsForRunStart()
            locationMgr.requestAlwaysAuthorization()
            if !startReceivingLocationChanges() {
                durationLabel.text = "Error getting location. Please ensure that location services are enabled."
                return
            }
            if !startRecievingPedometerChanges() {
                stepsLabel.text = "Error getting pedometer data. Please ensure that motion permissions are enabled."
                return
            }
        } else {
            locationMgr.stopUpdatingLocation()
            pedometer.stopUpdates()
            running = false
            walkStats!.endWalk()
            var duration: TimeInterval = 0.0
            var time: Time = Time(duration: 0.0)
            if startTime != nil {
                duration = walkStats!.getDuration()
                time = Time(duration: duration)
            }
            
            let distance = walkStats!.getDistanceFromWalks()
            durationLabel.text = String(format: "Walk was %d minutes and %d seconds long.", time.minutes!, time.seconds!)
            distanceLabel.text = String(format: "You walked %.2f meters.", distance)
            
            saveWalk()
            resetUIElements()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
        locationMgr.delegate = self
        locationMgr.startUpdatingLocation()
        return true
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]){
        let lastLocation = locations.last!
        if lastLocation.timestamp.timeIntervalSince(startTime!) >= 0 {
            filterAndAddLocation(lastLocation)
        }
        
        let distance = Int(walkStats!.getDistanceFromWalks())
        distanceLabel.text = "Distance Walked: " + String(distance) + " meters"
        
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
    
    func setupButtons() {
        let distGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let stepGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        
        stepsOkayImg.isUserInteractionEnabled = true
        stepsOkayImg.addGestureRecognizer(stepGestureRecognizer)
        distOkayImg.isUserInteractionEnabled = true
        distOkayImg.addGestureRecognizer(distGestureRecognizer)
    }
    
    @objc func setActive(_ sender: UITapGestureRecognizer) {
        if let view = sender.view {
            view.tintColor = UIColor(red: 75/255.0, green: 160/255.0, blue: 253/255.0, alpha: 1)
            if view == stepsOkayImg {
                goalType = "steps"
                distOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                goalLabel.text = "steps"
            } else {
                goalType = "distance"
                stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                goalLabel.text = "meters"
            }
            
        }
    }
    
    func setUpGoalTextFields() {
        
        distMeterGoalTextField.addTarget(self, action: #selector(meterTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
    }
    
    @objc func meterTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        goalValue = numMeters
    }
}

class Time {
    var minutes: Int?
    var seconds: Int?
    var hours: Int?
    var totalSeconds: Int?
    
    init(duration: TimeInterval) {
        let truncated = duration.truncatingRemainder(dividingBy: 1.0)
        self.totalSeconds = Int(duration - truncated)
        self.seconds = self.totalSeconds!%60
        self.minutes = (self.totalSeconds! - self.seconds!)/60
    }
}
