import db from '../Database/db.js';
import { calculateDistance } from '../utils/distance.js';

export const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
};

export const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate input coordinates
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Invalid coordinates' });
    }

    // Parse input to floats
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Query all schools from database
    db.query('SELECT * FROM schools', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        // Map schools with calculated distance, parsing lat/lon to floats
        const schoolsWithDistance = results.map(school => ({
            ...school,
            distance: calculateDistance(
                userLat,
                userLon,
                parseFloat(school.latitude),
                parseFloat(school.longitude)
            )
        }));

        // Sort schools by distance ascending
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        // Optional: Filter schools within 50 km radius (remove if you want all schools)
        const nearbySchools = schoolsWithDistance.filter(school => school.distance <= 50);

        // Send nearby schools as response
        res.json(nearbySchools);
    });
};

export const location = (req, res) => {
    const { latitude, longitude } = req.body;
    console.log('User location:', latitude, longitude);
    res.sendStatus(200);
};

export const renderIndex = (req, res) => {
    res.render('index');
};

