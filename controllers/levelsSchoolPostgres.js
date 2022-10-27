const pool = require("../queries");
const cache = require("../cache");

exports.getLevelsSchool = (req, res) => {

}

exports.getAllLevelSchool = (req, res) => {
    if (cache.get('levelsSchool')) {
        res.status(200).json(cache.get('levelsSchool'));
        return;
    }

    pool.query("select nameLevelSchool from levelsSchool", (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length === 0) {
            res.status(400).json({message: "No level school found"});
            return;
        }
        let output = [];
        results.rows.forEach(row => {
                output.push(row.namelevelschool);
            }
        );
        res.status(200).json(output);
    });
}