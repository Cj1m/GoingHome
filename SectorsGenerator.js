    let chance = new require('chance')();
    let sectorSize =  64;  // Must be a square number
    let sectorQuantityWeights = [0.05, 0.1, 0.2,0.4,0.2,0.05];

    let spaceObjectRange = {minX:30,minY:30,maxX:1000,maxY:1000};    // Spawn range for space objects
    let spaceObjectQuantityWeights = [0.6, 0.3, 0.1];

    exports.generate = function(){
        let sectors = [];

        for(let i = 0; i < sectorSize; i++){
            let newSector = {};

            newSector.spaceObjects = generateSpaceObjects();

            sectors.push(newSector);
        }

        return sectors;
    }

    function generateSpaceObjects(){
        let objects = [];
        let sectorQuantity = generateSectorQuantity();

        for(let i = 0; i < sectorQuantity; i++){
            let newObject = {};

            let objectID = generateSpaceObjectID();
            let objectQuantity = generateSpaceObjectsQuantity();
            let objectPos = generateSpaceObjectPosition();
            let objectRotationSpeed = chance.floating({min: -0.01, max: 0.01});
            let traits = generateSpaceObjectTraits(objectID);

            newObject.id = objectID;
            newObject.quantity = objectQuantity;
            newObject.position = objectPos;
            newObject.rotationSpeed = objectRotationSpeed;
            newObject.traits = traits;

            objects.push(newObject);
        }

        return objects;
    }


    function generateSectorQuantity(){
        return chance.weighted([0,6,7,8,9,10], sectorQuantityWeights);
    }

    function generateSpaceObjectID(){
        return 0;   // Just asteroids for now
    }

    function generateSpaceObjectsQuantity(){
        return chance.weighted([1,2,3], spaceObjectQuantityWeights);
    }

    function generateSpaceObjectPosition() {
        return {x : chance.integer({ min: spaceObjectRange.minX, max: spaceObjectRange.maxX }),
            y : chance.integer({ min: spaceObjectRange.minY, max: spaceObjectRange.maxY })};
    }

    function generateSpaceObjectTraits(id){
        let traits = {};
        switch(id){
            case 0:
                traits.type = chance.integer({min: 1, max: 4});
                traits.name = "Asteroid";
                break;
            case 1:
                traits.name = "Hydrogen";
                break;
            case 7:
                traits.name = "Black Hole";
                break;
            case 8:
                traits.name = "Worm Hole";
                break;
        }

        return traits;
    }