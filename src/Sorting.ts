export const Sorting = () => {
    const sortByProp = (arr: any, prop: string, invert?: boolean) => {
        let props = [] as any[];
        arr.forEach((_val: any, i: any) => {
            props[i] = arr[i][prop];
        });

        props.sort();
        if (invert) {
            props.reverse();
        }

        for (let i = 0; i < arr.length; i++) {
            let j = i;
            while (arr[i][prop] !== props[i]) {
                let tmp = arr.slice(j, j + 2);
                tmp.reverse();
                arr[j] = tmp[0];
                arr[j + 1] = tmp[1];
                j = j + 1;

                if (j === arr.length - 1) {
                    j = i;
                }

                if (!arr[arr.length - 1]) {
                    // remove undef index sometimes introduced by tmp.reverse()
                    arr.pop();
                }
            }
        }

        if (!invert) {
            return arr;
        } else {
            return arr;
        }
    };

    return {
        sortByProp,
    };
};
