'use strict';

( () => {
    const multiplyBy10 = (num) => {
        return num * 10;
    }

    const makeCacheFunction = (fn) => {
        const cacheResultsByVal = new Map;
        const cacheValsByIndex = new Map;
        let lastIndex = 0;

        return (...args) => {
            const val = args.values().next().value;

            if (cacheResultsByVal.has(val)) {

                console.log(`From cache | val: ${val} | res: ${cacheResultsByVal.get(val)} | cache size: ${cacheResultsByVal.size} | last index: ${lastIndex}`,
                    new Map(cacheValsByIndex), new Map(cacheResultsByVal));

                return cacheResultsByVal.get(val);
            }

            if (cacheResultsByVal.size >= 10) {
                const valToDelete = cacheValsByIndex.get(lastIndex - 9);
                cacheValsByIndex.delete(lastIndex - 9);
                cacheResultsByVal.delete(valToDelete);
            }

            ++lastIndex;
            cacheValsByIndex.set(lastIndex, val);
            cacheResultsByVal.set(val, fn(val));

            console.log(`New | val: ${val} | res: ${cacheResultsByVal.get(val)} | cache size: ${cacheResultsByVal.size} | last index: ${lastIndex}`,
                new Map(cacheValsByIndex), new Map(cacheResultsByVal));

            return cacheResultsByVal.get(val);
        }
    }

    const getMultiplyBy10 = makeCacheFunction(multiplyBy10);

    console.log(getMultiplyBy10(1));
    console.log(getMultiplyBy10(2));
    console.log(getMultiplyBy10(3));
    console.log(getMultiplyBy10(4));
    console.log(getMultiplyBy10(5));
    console.log(getMultiplyBy10(6));
    console.log(getMultiplyBy10(7));
    console.log(getMultiplyBy10(8));
    console.log(getMultiplyBy10(9));
    console.log(getMultiplyBy10(10));
    console.log(getMultiplyBy10(11));
    console.log(getMultiplyBy10(12));
    console.log(getMultiplyBy10(12));
    console.log(getMultiplyBy10(5));
    console.log(getMultiplyBy10(4));
    console.log(getMultiplyBy10(3));
    console.log(getMultiplyBy10(2));
    console.log(getMultiplyBy10(1));

})()
