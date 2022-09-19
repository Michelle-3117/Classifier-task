const input = [
  {
    name: 'Hendrick',
    dob: '1853-07-18T00:00:00.000Z',
    regNo: '041',
  },
  {
    name: 'Albert',
    dob: '1879-03-14T00:00:00.000Z',
    regNo: '033',
  },
  {
    name: 'Marie',
    dob: '1867-11-07T00:00:00.000Z',
    regNo: '024',
  },
  {
    name: 'Neils',
    dob: '1885-10-07T00:00:00.000Z',
    regNo: '02',
  },
  {
    name: 'Max',
    dob: '1858-04-23T00:00:00.000Z',
    regNo: '014',
  },
  {
    name: 'Erwin',
    dob: '1887-08-12T00:00:00.000Z',
    regNo: '09',
  },
  {
    name: 'Auguste',
    dob: '1884-01-28T00:00:00.000Z',
    regNo: '08',
  },
  {
    name: 'Karl',
    dob: '1901-12-05T00:00:00.000Z',
    regNo: '120',
  },
  {
    name: 'Louis',
    dob: '1892-08-15T00:00:00.000Z',
    regNo: '022',
  },
  {
    name: 'Arthur',
    dob: '1892-09-10T00:00:00.000Z',
    regNo: '321',
  },
  {
    name: 'Paul',
    dob: '1902-08-08T00:00:00.000Z',
    regNo: '055',
  },
  {
    name: 'William',
    dob: '1890-03-31T00:00:00.000Z',
    regNo: '013',
  },
  {
    name: 'Owen',
    dob: '1879-04-26T00:00:00.000Z',
    regNo: '052',
  },
  {
    name: 'Martin',
    dob: '1871-02-15T00:00:00.000Z',
    regNo: '063',
  },
  {
    name: 'Guye',
    dob: '1866-10-15T00:00:00.000Z',
    regNo: '084',
  },
  {
    name: 'Charles',
    dob: '1868-02-14T00:00:00.000Z',
    regNo: '091',
  },
];


function classifier(input) {
  //check if array is actually an array
  if(!Array.isArray(input)){
    throw new Error("invalid")
   }
   //get a copy of the array to preven alteration/mutation
   const secInput = input.slice();


   //assign the current year to variable
   let currentYear = 2019;
  //  let newOutput = {};

   //loop through the input array to convert dob to an actual year.
   //get the age and add it to the input(array of objects).
   for(let student of secInput){
     let newdob = new Date(student.dob).getFullYear();
     student['age'] = currentYear - newdob;
    }

    //sort by ages
    secInput.sort(function(a, b){
      return a.age - b.age;
    });

    //check if array is empty
   if(secInput.length === 0){
     return {'noOfGroups': 0};
    }
  else{
    let newOutput = secInput.reduce((acc, curr) => {
      let group = Object.values(acc).find(group => group.members && group.members.length < 3
        && group.members.every(element => Math.abs(element.age - curr.age) <= 5));

      if (group) {
        group.members.push(curr);
        group.regNos.push(+curr.regNo);
        group.regNos.sort((a,b) => a - b)
        group.oldest = Math.max(...group.members.map(element => element.age));
        group.sum = group.sum + curr.age;
      } else {
        acc.noOfGroups = acc.noOfGroups + 1 || 1;
        let groupName = "group" + acc.noOfGroups;
        acc[groupName] = {
          "members": [curr],
          "oldest": curr.age,
          "sum": curr.age,
          "regNos": [+curr.regNo].sort((a,b) => b - a),
        };
      }

      return acc;
    }, {});
    return newOutput;
  }
return newOutput;
}
// console.log(classifier(input))
export default classifier;
