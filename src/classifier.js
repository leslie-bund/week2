function classifier(input) {

    // Save the initial array
    const dummyInput = input.slice();


    // Initialize an age sorted Array of inputs and an array to hold student "age" only.
    let ageSortedInput = [];
    const studentAges = [];

    // Calculate and update the age for all students
    dummyInput.forEach((element) => {
        element.age = 2019 - new Date(element.dob).getFullYear();
        studentAges.push(element.age);
    });

    //Sort the studentAge array in ascending order, then sort the array of objects with it.
    studentAges.sort((a, b) => a - b);

    studentAges.forEach((element) => {
        ageSortedInput.push(getStudentInfo(element));
    })

    ageSortedInput = ageSortedInput.flat();
    
    // Group the students array of object according to grouping constraints.
    const ageGroupedInput = [];
    let buffer;
    for (let d = 0; d < ageSortedInput.length; d++) {
        if (buffer?.length > 0) {
            if (Math.abs(buffer[buffer.length - 1].age - ageSortedInput[d].age) <= 5 && buffer.length < 3) {
                buffer.push(ageSortedInput[d]);
                continue;
            } else {
                ageGroupedInput.push(buffer);
            }
        } 
        buffer = [];
        buffer.push(ageSortedInput[d]);
    }

    // Send values left over in the buffer to the ageGroupedInput
    if (buffer?.length > 0) {
        ageGroupedInput.push(buffer);
    }
    
    // Prepare the output array
    const output = {
        noOfGroups: ageGroupedInput.length,
    };

    for (let index in ageGroupedInput) {
        let reg = [];
        let agE = [];
        ageGroupedInput[index].forEach((element) => {
            reg.push(Number(element.regNo));
            agE.push(Number(element.age));
        })
        
        output[`group${Number(index) + 1}`] = {
            members: ageGroupedInput[index],
            oldest: Math.max(...agE),
            sum: agE.reduce((acc, item) => {
                return acc + item;``
            }),
            regNos: reg.sort((a, b) => a - b),
        };
    }
    return output;

    // Closed functions
    function getStudentInfo (age , ind) {
        for (let objs of dummyInput) {
            if (age === objs.age) {
                return dummyInput.splice(dummyInput.indexOf(objs), 1);
            }
        }
    }
}

export default classifier;
