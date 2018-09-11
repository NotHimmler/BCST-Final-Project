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
    weak var delegate: WalksDelegate?
    
    // MARK: Properties
    
    @IBOutlet weak var StepsLabel: UILabel!
    @IBOutlet weak var DistanceLabel: UILabel!
    @IBOutlet weak var DurationLabel: UILabel!
    @IBOutlet weak var asdf: UILabel!
    @IBOutlet weak var RecrodBtton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        DistanceLabel.isHidden = true
        StepsLabel.isHidden = true
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
    }
    
    @IBAction func ButtonClickHandler(_ sender: Any) {
        if (!running) {
            locationMgr.requestAlwaysAuthorization()
            if !startReceivingLocationChanges() {
                DurationLabel.text = "Error getting location. Please ensure that location services are enabled."
                return
            }
            if CMPedometer.isStepCountingAvailable() {
                pedometer.startUpdates(from: Date()) {
                    [weak self] pedometerData, error in
                    guard let pedometerData = pedometerData, error == nil else {return}
                    
                    DispatchQueue.main.async {
                        self!.numSteps = Int(pedometerData.numberOfSteps)
                        self!.StepsLabel.text = "Num Steps: " + String(self!.numSteps)
                        
                    }
                }
            }
            DistanceLabel.text = ""
            DurationLabel.text = "Logging Your Walk"
            StepsLabel.text = "Number of Steps: " + String(numSteps)
            DistanceLabel.isHidden = false
            StepsLabel.isHidden = false
            RecrodBtton.setTitle("Stop Logging Walk", for: .normal)
            RecrodBtton.backgroundColor = UIColor.red
            startTime = Date()
            running = true;
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
            var distance: Double = 0.0
            if walkLocations.count > 1 {
                print(walkLocations.count)
                for index in 1...(walkLocations.count - 1) {
                    print(index)
                    let currentLocation = walkLocations[index]
                    distance += currentLocation.distance(from: walkLocations[index - 1])
                }
            }
            DurationLabel.text = String(format: "Walk was %d minutes and %d seconds long.", minutes, seconds)
            DistanceLabel.text = String(format: "You walked %.2f meters.", distance)
            RecrodBtton.setTitle("Start Recording", for: .normal)
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
            RecrodBtton.backgroundColor = UIColor.green
            walkLocations = []
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
        locationMgr.distanceFilter = 10.0
        locationMgr.delegate = self
        locationMgr.startUpdatingLocation()
        return true
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]){
        let lastLocation = locations.last!
        if lastLocation.timestamp.timeIntervalSince(startTime!) >= 0 {
            walkLocations.append(lastLocation)
        }
    }
}

