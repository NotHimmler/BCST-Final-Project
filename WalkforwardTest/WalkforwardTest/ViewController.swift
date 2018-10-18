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



class ViewController: UIViewController {
    var goalType = "distance"
    var goalValue = 0
    var goalDarkenUIViews: [UIImageView]?
    let DARK_GREY = UIColor(displayP3Red: 0.0, green: 0.0, blue: 0.0, alpha: 0.7)
    let LIGHT_GREY = UIColor(displayP3Red: 0.0, green: 0.0, blue: 0.0, alpha: 0.25)
    let MINUTES_KEY = "minutes"
    let STEPS_KEY = "steps"
    let DIST_KEY = "meters"
    
    // MARK: Interface Outlets
    @IBOutlet weak var RecordButton: UIButton!
    @IBOutlet weak var distGoalTextField: UITextField!
    @IBOutlet weak var stepGoalTextField: UITextField!
    @IBOutlet weak var minGoalTextField: UITextField!
    @IBOutlet weak var distGoalStackView: UIStackView!
    @IBOutlet weak var stepGoalStackView: UIStackView!
    @IBOutlet weak var timeGoalStackView: UIStackView!
    @IBOutlet weak var stepsOkayImg: UIImageView!
    @IBOutlet weak var minsOkayImg: UIImageView!
    @IBOutlet weak var distOkayImg: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        RecordButton.backgroundColor = UIColor(red: 76/255.0, green: 217/255.0, blue: 100/255.0, alpha: 1.0)
        RecordButton.layer.cornerRadius = 5
        self.addDoneButtonOnKeyboard()
        setupButtons()
        setUpGoalTextFields()
        goalDarkenUIViews = [makeDarkenBackgroundView(),makeDarkenBackgroundView(),makeDarkenBackgroundView()]
        goalDarkenUIViews![1].backgroundColor = DARK_GREY
        goalDarkenUIViews![2].backgroundColor = DARK_GREY
        pinBackground(goalDarkenUIViews![0], to: distGoalStackView)
        pinBackground(backgroundViewDist, to: distGoalStackView)
        pinBackground(goalDarkenUIViews![1], to: stepGoalStackView)
        pinBackground(backgroundViewSteps, to: stepGoalStackView)
        pinBackground(goalDarkenUIViews![2], to: timeGoalStackView)
        pinBackground(backgroundViewTime, to: timeGoalStackView)
        getSavedGoals();
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:))))
        
        WalkSyncing.syncWalkItems()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        print("view did appear")
    }
     // Author  - Adam Stoller
    // https://stackoverflow.com/a/40063434
    func addDoneButtonOnKeyboard() {
        let doneToolbar: UIToolbar = UIToolbar(frame: CGRect(x: 0, y: 0, width: 320, height: 50))
        doneToolbar.barStyle       = UIBarStyle.default
        let flexSpace              = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.flexibleSpace, target: nil, action: nil)
        let done: UIBarButtonItem  = UIBarButtonItem(title: "Done", style: UIBarButtonItemStyle.done, target: self, action: #selector(ViewController.doneButtonAction))
        
        var items = [UIBarButtonItem]()
        items.append(flexSpace)
        items.append(done)
        
        doneToolbar.items = items
        doneToolbar.sizeToFit()
        
        self.distGoalTextField.inputAccessoryView = doneToolbar
        self.stepGoalTextField.inputAccessoryView = doneToolbar
        self.minGoalTextField.inputAccessoryView = doneToolbar
    }
    
    @objc func doneButtonAction() {
        self.distGoalTextField.resignFirstResponder()
        self.stepGoalTextField.resignFirstResponder()
        self.minGoalTextField.resignFirstResponder()
    }
    
    func getSavedGoals() {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
            return
        }
        
        let managedContext = appDelegate.persistentContainer.viewContext
        
        let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Goals")
        var result: [NSManagedObject]?
        do {
            result = try managedContext.fetch(fetchRequest)
            if result!.count > 0 {
                goalValue = result![0].value(forKey: "meters") as! Int
                distGoalTextField.text = String(goalValue)
                stepGoalTextField.text = String(result![0].value(forKey: "steps") as! Int)
                minGoalTextField.text = String(result![0].value(forKey: "minutes") as! Int)
            }
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
    }
    
    @IBAction func ButtonClickHandler(_ sender: Any) {
        if checkHasRequiredPermissions() {
            performSegue(withIdentifier: "CurrentWalkSegue", sender: self)
        } else {
            print("Don't have permissions")
        }
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func setupButtons() {
        stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
        minsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
        
        let distGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let stepGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let minsGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let distTfGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let stepTfGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let minsTfGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        
        
        stepsOkayImg.isUserInteractionEnabled = true
        stepsOkayImg.addGestureRecognizer(stepGestureRecognizer)
        distOkayImg.isUserInteractionEnabled = true
        distOkayImg.addGestureRecognizer(distGestureRecognizer)
        minsOkayImg.isUserInteractionEnabled = true
        minsOkayImg.addGestureRecognizer(minsGestureRecognizer)
        stepGoalTextField.isUserInteractionEnabled = true
        stepGoalTextField.addGestureRecognizer(stepTfGestureRecognizer)
        distGoalTextField.isUserInteractionEnabled = true
        distGoalTextField.addGestureRecognizer(distTfGestureRecognizer)
        minGoalTextField.isUserInteractionEnabled = true
        minGoalTextField.addGestureRecognizer(minsTfGestureRecognizer)
    }
    
    @objc func setActive(_ sender: UITapGestureRecognizer) {
        if let view = sender.view {
            if view == stepsOkayImg || view == stepGoalTextField {
                if view == stepGoalTextField {
                    stepGoalTextField.becomeFirstResponder()
                }
                goalType = "steps"
                goalValue = Int(stepGoalTextField.text!)!
                goalDarkenUIViews![0].backgroundColor = DARK_GREY
                goalDarkenUIViews![2].backgroundColor = DARK_GREY
                goalDarkenUIViews![1].backgroundColor = LIGHT_GREY
                stepsOkayImg.tintColor = UIColor(red: 75/255.0, green: 160/255.0, blue: 253/255.0, alpha: 1)
                distOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                minsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            } else if view == distOkayImg || view == distGoalTextField {
                if view == distGoalTextField {
                    distGoalTextField.becomeFirstResponder()
                }
                goalType = "distance"
                goalValue = Int(distGoalTextField.text!)!
                goalDarkenUIViews![1].backgroundColor = DARK_GREY
                goalDarkenUIViews![2].backgroundColor = DARK_GREY
                goalDarkenUIViews![0].backgroundColor = LIGHT_GREY
                distOkayImg.tintColor = UIColor(red: 75/255.0, green: 160/255.0, blue: 253/255.0, alpha: 1)
                stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                minsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            } else {
                if view == minGoalTextField {
                    minGoalTextField.becomeFirstResponder()
                }
                goalType = "minutes"
                goalValue = Int(minGoalTextField.text!)!
                goalDarkenUIViews![0].backgroundColor = DARK_GREY
                goalDarkenUIViews![1].backgroundColor = DARK_GREY
                goalDarkenUIViews![2].backgroundColor = LIGHT_GREY
                minsOkayImg.tintColor = UIColor(red: 75/255.0, green: 160/255.0, blue: 253/255.0, alpha: 1)
                stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                distOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            }
            
        }
    }
    
    func setUpGoalTextFields() {
        
        distGoalTextField.addTarget(self, action: #selector(meterTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
        stepGoalTextField.addTarget(self, action: #selector(stepTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
        minGoalTextField.addTarget(self, action: #selector(minTextFieldChange(textField:)), for: UIControlEvents.editingChanged)
    }
    
    @objc func meterTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        overWriteDefaultGoal("meters", numMeters)
        goalValue = numMeters
    }
    
    @objc func stepTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        overWriteDefaultGoal("steps", numMeters)
        goalValue = numMeters
    }
    
    @objc func minTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        overWriteDefaultGoal("minutes", numMeters)
        goalValue = numMeters
    }
    
    func overWriteDefaultGoal(_ goalType: String, _ goalValue: Int) {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
            return
        }
        
        let managedContext = appDelegate.persistentContainer.viewContext
        
        let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Goals")
        var result: [NSManagedObject]?
        do {
            result = try managedContext.fetch(fetchRequest)
            if result!.count > 0 {
                result![0].setValue(goalValue, forKey: goalType);
            } else {
                guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
                    return
                }
                
                let managedContext = appDelegate.persistentContainer.viewContext
                
                let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Goals")
                var result: [NSManagedObject]?
                do {
                    result = try managedContext.fetch(fetchRequest)
                    if result!.count > 0 {
                        self.goalValue = result![0].value(forKey: "meters") as! Int
                        distGoalTextField.text = String(goalValue)
                        stepGoalTextField.text = String(result![0].value(forKey: "steps") as! Int)
                        minGoalTextField.text = String(result![0].value(forKey: "minutes") as! Int)
                    } else {
                        let entity = NSEntityDescription.entity(forEntityName: "Goals", in: managedContext)!
                        let newWalk = NSManagedObject(entity: entity, insertInto: managedContext)
                        newWalk.setValue(0, forKey: "meters")
                        newWalk.setValue(0, forKey: "steps")
                        newWalk.setValue(0, forKey: "minutes")
                        newWalk.setValue(goalValue, forKey: goalType)
                    }
                    
                    try managedContext.save()
                    
                } catch let error as NSError {
                    print("Could not fetch. \(error), \(error.userInfo)")
                }
            }
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destVC : CurrentWalkViewController = segue.destination as! CurrentWalkViewController
        destVC.goalType = self.goalType
        destVC.goalValue = self.goalValue
    }
    
    func checkHasRequiredPermissions() -> Bool {
        
        let authStatus = CLLocationManager.authorizationStatus()
        
        if authStatus == .notDetermined {
            print("Location status not determined")
            let locMgr = CLLocationManager()
            locMgr.requestAlwaysAuthorization()
            while CLLocationManager.authorizationStatus() == .notDetermined {print("Hello")}
        }
        
        if authStatus != .authorizedWhenInUse && authStatus != .authorizedAlways {
            print("Location status not authorised")
            return false
        }
        
        if !CLLocationManager.locationServicesEnabled() {
            print("Location services disabled")
            return false
        }
        
        let cmAuthStatus = CMPedometer.authorizationStatus()
        
        if cmAuthStatus == .notDetermined {
            print("Pedometer status not determined")
            let pedometer = CMPedometer()
            pedometer.queryPedometerData(from: Date(), to: Date())  {
                [weak self] pedometerData, error in
                while CMPedometer.authorizationStatus() == .notDetermined {
                    print("Hello")
                }
            }
        }
        
        if cmAuthStatus != .authorized {
            print("Pedometer status not authorised")
            return false
        }
        
        return true
    }
    
    private lazy var backgroundViewDist: UIImageView = {
        let view = UIImageView()
        view.image = UIImage(named: "distance-drive-foggy-24821.jpg")
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 5
        return view
    }()
    
    private lazy var backgroundViewSteps: UIImageView = {
        let view = UIImageView()
        view.image = UIImage(named: "beach-salt-water-sand-17727.jpg")
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 5
        return view
    }()
    
    private lazy var backgroundViewTime: UIImageView = {
        let view = UIImageView()
        view.image = UIImage(named: "art-blur-brass-678248.jpg")
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 5
        return view
    }()
    
    func makeDarkenBackgroundView() -> UIImageView {
        let view = UIImageView()
        view.backgroundColor = UIColor(displayP3Red: 0.0, green: 0.0, blue: 0.0, alpha: 0.25)
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 5
        return view
    }
    
    
    
    private func pinBackground(_ view: UIImageView, to stackView: UIStackView) {
        view.translatesAutoresizingMaskIntoConstraints = false
        stackView.insertSubview(view, at: 0)
        view.pin(to: stackView)
    }
}

public extension UIImageView {
    public func pin(to view: UIView) {
        NSLayoutConstraint.activate([
            leadingAnchor.constraint(equalTo: view.leadingAnchor),
            trailingAnchor.constraint(equalTo: view.trailingAnchor),
            topAnchor.constraint(equalTo: view.topAnchor),
            bottomAnchor.constraint(equalTo: view.bottomAnchor)
            ])
    }
}
