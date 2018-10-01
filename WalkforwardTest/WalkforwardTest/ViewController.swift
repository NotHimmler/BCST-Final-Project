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
    var goalType = "distance"
    var goalValue = 0
    
    // MARK: Properties
    @IBOutlet weak var RecordButton: UIButton!
    @IBOutlet weak var distGoalTextField: UITextField!
    @IBOutlet weak var stepGoalTextField: UITextField!
    @IBOutlet weak var minGoalTextField: UITextField!
    
    // MARK: Goals
    @IBOutlet weak var stepsGoal: UIView!
    @IBOutlet weak var distanceGoal: UIView!
    @IBOutlet weak var stepsOkayImg: UIImageView!
    @IBOutlet weak var minsOkayImg: UIImageView!
    @IBOutlet weak var distOkayImg: UIImageView!
    
    @IBOutlet weak var goalProgressBar: UIProgressView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        RecordButton.backgroundColor = UIColor(red: 76/255.0, green: 217/255.0, blue: 100/255.0, alpha: 1.0)
        setupButtons()
        setUpGoalTextFields()
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:))))
    }
    
    @IBAction func ButtonClickHandler(_ sender: Any) {
        performSegue(withIdentifier: "CurrentWalkSegue", sender: self)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func setupButtons() {
        let distGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let stepGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        let minsGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(setActive(_:)))
        
        stepsOkayImg.isUserInteractionEnabled = true
        stepsOkayImg.addGestureRecognizer(stepGestureRecognizer)
        distOkayImg.isUserInteractionEnabled = true
        distOkayImg.addGestureRecognizer(distGestureRecognizer)
        minsOkayImg.isUserInteractionEnabled = true
        minsOkayImg.addGestureRecognizer(minsGestureRecognizer)
    }
    
    @objc func setActive(_ sender: UITapGestureRecognizer) {
        if let view = sender.view {
            print(view)
            view.tintColor = UIColor(red: 75/255.0, green: 160/255.0, blue: 253/255.0, alpha: 1)
            if view == stepsOkayImg {
                goalType = "steps"
                distOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                minsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            } else if view == distOkayImg {
                goalType = "distance"
                stepsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
                minsOkayImg.tintColor = UIColor(red: 124/255.0, green: 124/255.0, blue: 124/255.0, alpha: 1)
            } else {
                goalType = "minutes"
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
        goalValue = numMeters
    }
    
    @objc func stepTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        goalValue = numMeters
    }
    
    @objc func minTextFieldChange(textField: UITextField) {
        let numMeters = (textField.text! as NSString).integerValue
        goalValue = numMeters
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destVC : CurrentWalkViewController = segue.destination as! CurrentWalkViewController
        destVC.goalType = self.goalType
        destVC.goalValue = self.goalValue
    }
}
