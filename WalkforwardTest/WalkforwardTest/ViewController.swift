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
    var distGoal = 0
    var stepGoal = 0
    @IBOutlet weak var EmbbededStatusView: EmbeddedStatusUIView!
    
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
    @IBOutlet weak var distKmGoalTextField: UITextField!
    @IBOutlet weak var distMeterGoalTextField: UITextField!
    
    @IBOutlet weak var stepGoalTextField: UITextField!
    @IBOutlet weak var goalProgressBar: UIProgressView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
        setupButtons()
        setUpGoalTextFields()
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:))))
    }
    
    fileprivate func resetUIElements() {
        distKmGoalTextField.isUserInteractionEnabled = true
        distMeterGoalTextField.isUserInteractionEnabled = true
        stepGoalTextField.isUserInteractionEnabled = true
        distOkayImg.isUserInteractionEnabled = true
        stepsOkayImg.isUserInteractionEnabled = true
        RecordButton.backgroundColor = UIColor.green
        RecordButton.setTitle("Start Recording", for: .normal)
    }
    
    fileprivate func setUIElementsForRunStart() {
        goalProgressBar.progress = 0.0
        distanceLabel.text = ""
        durationLabel.text = "Logging Your Walk"
        stepsLabel.text = "Number of Steps: " + String(numSteps)
        RecordButton.setTitle("Stop Logging Walk", for: .normal)
        RecordButton.backgroundColor = UIColor.red
        distKmGoalTextField.isUserInteractionEnabled = false
        distMeterGoalTextField.isUserInteractionEnabled = false
        stepGoalTextField.isUserInteractionEnabled = false
        distOkayImg.isUserInteractionEnabled = false
        stepsOkayImg.isUserInteractionEnabled = false
    }
    
    fileprivate func startRecievingPedometerChanges() -> Bool {
        if CMPedometer.isStepCountingAvailable() {
            pedometer.startUpdates(from: Date()) {
                [weak self] pedometerData, error in
                guard let pedometerData = pedometerData, error == nil else {return}
                
                DispatchQueue.main.async {
                    self!.numSteps = Int(truncating: pedometerData.numberOfSteps)
                    self!.stepsLabel.text = "Num Steps: " + String(self!.numSteps)
                    if self!.goalType == "steps" {
                        let pctDone: Float = Float(self!.numSteps)/Float(self!.stepGoal)
                        self!.goalProgressBar.progress = pctDone
                    }
                }
            }
            return true
        } else {
            return false
        }
    }
    
    @IBAction func ButtonClickHandler(_ sender: Any) {
        if (!running) {
            metersWalked = 0
            numSteps = 0
            walkLocations = []
            startTime = Date()
            running = true;
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
            running = false;
            endTime = Date()
            var duration: TimeInterval = 0.0
            var durationInt: Int64 = 0
            var minutes: Int64 = 0
            var seconds: Int64 = 0
            if startTime != nil {
                duration = (endTime!.timeIntervalSince(startTime!))
                let truncated = duration.truncatingRemainder(dividingBy: 1.0)
                duration -= truncated
                durationInt = Int64(duration)
                seconds = durationInt%60
                minutes = (durationInt - seconds)/60
            }
            let distance = getDistanceFromWalks()
            durationLabel.text = String(format: "Walk was %d minutes and %d seconds long.", minutes, seconds)
            distanceLabel.text = String(format: "You walked %.2f meters.", distance)
            
            let newWalk = NSManagedObject(entity: entity!, insertInto: context!)
            newWalk.setValue(durationInt, forKey: "duration")
            newWalk.setValue(numSteps, forKey: "steps")
            newWalk.setValue(startTime!, forKey: "date")
            newWalk.setValue(distance, forKey: "distance")
            do {
                try context!.save()
            } catch {
                print("Failed saving")
            }
            resetUIElements()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func getDistanceFromWalks() -> Double {
        var distance: Double = 0.0
        if walkLocations.count > 1 {
            for index in 1...(walkLocations.count - 1) {
                let previousLocation = walkLocations[index - 1]
                let currentLocation = walkLocations[index]
                distance += currentLocation.distance(from: previousLocation)
            }
        }
        
        return distance
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
            walkLocations.append(lastLocation)
        }
        
        let distance = Int(getDistanceFromWalks())
        distanceLabel.text = "Distance Walked: " + String(distance) + " meters"
        
        if goalType == "distance" {
            goalProgressBar.progress = Float(distance)/Float(distGoal)
        }
        
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
            } else {
                goalType = "distance"
                stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            }
            
        }
    }
    
    func setUpGoalTextFields() {
        distKmGoalTextField.addTarget(self, action: #selector(kmTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
        
        distMeterGoalTextField.addTarget(self, action: #selector(meterTextFieldChange(textField:)), for: UIControlEvents.editingChanged)

        stepGoalTextField.addTarget(self, action: #selector(stepTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
    }
    
    @objc func kmTextFieldChange(textField: UITextField) {
        let numKms = (textField.text! as NSString).integerValue
        let numMeters = (distMeterGoalTextField!.text! as NSString).integerValue
        distGoal = numKms*1000 + numMeters
    }
    
    @objc func meterTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        let numKms = (distKmGoalTextField!.text! as NSString).integerValue
        distGoal = numKms*1000 + numMeters
    }
    
    @objc func stepTextFieldChange(textField: UITextField) {
        let stepString: String = stepGoalTextField!.text!
        let stepInt: Int = (stepString as NSString).integerValue
        stepGoal = stepInt
    }
}

@IBDesignable
class EmbeddedStatusUIView: UIView {
    public func printHello() {
        print("Hello")
    }
    
    /**
    @IBInspectable var cornerRadius: CGFloat = 0.0 {
        didSet {
            self.layer.cornerRadius = cornerRadius
        }
    }
    
    @IBInspectable var borderColor: UIColor = UIColor.black {
        didSet {
            self.layer.borderColor = borderColor.cgColor
        }
    }
    
    @IBInspectable var borderWidth: CGFloat = 2.0 {
        didSet {
            self.layer.borderWidth = borderWidth
        }
    }
    **/
}

