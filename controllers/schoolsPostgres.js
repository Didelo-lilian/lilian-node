const pool = require("../queries");
const cache = require("../cache");

exports.getSchool = (req, res) => {

}

exports.getAllSchool = (req, res) => {
    if (cache.get('schools')) {
        res.status(200).json(cache.get('schools'));
        return;
    }

    pool.query("select nameLevelSchool || '/\' || nameSchool as schoolRoad from schools natural join levelsSchool order by nameLevelSchool desc , nameSchool", (error, results) => {
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
                    output.push(row.schoolroad);
                }
            );
            res.status(200).json(output);
        }
    )
    ;
}