function findDuplicateTransactions(transactions) {

    // Make a copy of the Array for mutations.
    const decoyArr = transactions.slice();

    // Sort the entire Decoy array by time.
    decoyArr.sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    // Use a while loop to mutate and group the  decoyArr
    const groupedTrans = [];
    let groupingBuffer = [];

    while(decoyArr.length > 0) {
        if (groupingBuffer.length > 0) {
            let match;
            // Find all matching objects
            do {
                // Destructure the last object in the groupingBuffer
                const {
                    sourceAccount: sA1,
                    targetAccount: tA1,
                    amount: a1,
                    category: c1,
                    time: t1
                } = groupingBuffer[groupingBuffer.length - 1]; 
                
                // Find the next object that matches the last item in the buffer
                match = decoyArr.find((element) => {
                    // Destructure the current object
                    const {
                        sourceAccount: sA2,
                        targetAccount: tA2,
                        amount: a2,
                        category: c2,
                        time: t2
                    } = element;

                    // Get the time of both transactions in seconds
                    const last = new Date(t1).getTime() / 1000;
                    const curr = new Date(t2).getTime() / 1000;
                
                    return sA1 === sA2 && tA1 === tA2 && c1 === c2 && a1 === a2 && Math.abs(last - curr) < 60;
                });
                if (match !== undefined) {
                    // If a match is found, add it to buffer and remove it from decoyArr
                    groupingBuffer.push(match);
                    decoyArr.splice(decoyArr.indexOf(match), 1);
                }
            } while (match !== undefined);
            if (groupingBuffer.length > 1) {
                groupedTrans.push(groupingBuffer);
            }
            groupingBuffer = [];            
        }
        let holder = decoyArr.shift();
        if (holder !== undefined) {groupingBuffer.push(holder);}
    }

    if (groupingBuffer.length > 1 ) {
        groupedTrans.push(groupingBuffer);
    }

    return groupedTrans;
}

export default findDuplicateTransactions;
