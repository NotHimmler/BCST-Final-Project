//
//  Walk.swift
//  WalkforwardTest
//
//  Created by Heinrich Malan on 17/9/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import Foundation
import CoreLocation

class WalkStats {
    private var numSteps: Int
    private var distanceWalked: Int
    private var startTime: Date
    private var endTime: Date?
    private var duration: Int
    private var walkLocations: [CLLocation]
    
    init() {
        numSteps = 0;
        distanceWalked = 0;
        startTime = Date()
        walkLocations = []
        duration = 0
    }
    
    func getSteps() -> Int {
        return numSteps
    }
    
    func addSteps(steps: Int) {
        numSteps = steps
    }
    
    func getDistance() -> Int {
        return Int(getDistanceFromWalks())
    }
    
    func addDistance(meters: Int) {
        distanceWalked += meters
    }
    
    func getDuration() -> TimeInterval {
        return endTime!.timeIntervalSince(startTime)
    }
    
    func addWalkLocation(location: CLLocation) {
        walkLocations.append(location)
    }
    
    func getStartTime() -> Date {
        return startTime
    }
    
    func getEndTime() -> Date {
        return endTime!
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
    
    func endWalk() {
        endTime = Date()
    }
}
