const testArray = [25.25, 19.99, 5.87];

// 1. Suma elementów tablicy 

testArray.reduce((total, value) => total + value); // 51.10999999999999

// 2. Średnia wartość elementów

testArray.reduce((total, value, index, array) => {
    total += value; // sumowanie elementów
    if(index === array.length -1) return total / array.length; // kiedy mamy doczynienie z ostatnim elementem zwracamy średnią wartość
    return total; //17.036666666666665
});

// 3. Czy w podanym zestawie danych są duplikaty.

const newArray = [1, 2, 3, 4, 5, 5, 6, 7];

// 3.1

const duplicates = newArray.reduce((total, value) => { // w callbacku sprawdzamy czy bieżąca wartość elementu znajduje się w nowo tworzonej tablicy
    if(total.indexOf(value) === -1) total.push(value);
    return total;
},[]);

newArray.length !== duplicates.length;

//3.2. użycie Set

(new Set(newArray)).size !== newArray.length;

// 4. Spłaszczanie zagnieżdżonych tablic

const data = [[1, 2, 3],[4, 5, 6]];
data.reduce((total,array) => total.concat(array));
data.flat(Infinity); 

// 5. Spłaszczanie zagnieżdżonych obiektów

const tree = {
    id: 1,
    Children: [
        { id: 2},
        { id: 3,
        children: [{ id: 4}, {id: 5}]
        }
    ]
};

const flatten = (obj) => {
    const arr = Array.isArray(obj) ? obj: [obj];
    return arr.reduce((result,value) => {
        result.push(value);
        if(value.children) {
            result = result.concat(flatten(value.children));
            delete value.children;
        }
        return result;
    }, []);
};

flatten(tree);

// 6. Modyfikacja struktury obiektu

const formData = {
    name: "Mateusz",
    "billing_address_city": "Poznan",
    "billing_address_street": "ul.Poznanska",
    "shipping_address_city": "Wroclaw",
    "shipping_address_street": "ul.Wroclawska",   
};

Object.keys(formData).reduce((result, key) => {
    if(!key.match("_")) {
        result[key] = formData[key];
    } else {
        const newKey = key.split(/_([^_]*)$/);
        if(!result[newKey[0]]) result[newKey[0]] = {}
            result[newKey[0]][newKey[1]] = formData[key];
    }
    return result;
}, {});

// 7. Użycie reduce na funkcjach

function add(value) {return value + 1};
function subtract(value) {return value - 2};
function double(value) {return value * 3};

const allFunction = [add, subtract, double];
allFunction.reduce((total, func) => {
    return func(total);
}, 20);
