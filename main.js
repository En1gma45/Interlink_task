const fs = require('fs');
let fileName = 'acme_worksheet.csv'
let test = 'test.csv'
let list = ['Name/Date']
let rez = []
let rows = []


fs.readFile(fileName, function(err, data){
    if(err) throw err
    let fileData =  data.toString();
    fileData.split('\n').slice(1).forEach((item)=>{
        rows.push(item.split(','))
    })
    rows.forEach((item)=>{
        for(let i=0; i<item.length; i++){
            if(!list[0].includes(item[1])){
                list[0]=list[0].concat(',' , item[1])
            }
        }
    })

    list[0]=list[0].concat('\r')

    rows.forEach((item, rowIndex)=>{
        let currentCell = item[0]
        if(!list.includes(currentCell)){
            list.push(currentCell)
        }
        rows.forEach((row)=>{
            if(currentCell === row[0]) list[rowIndex+1] = list[rowIndex+1].concat(',', row[2].replace('\r', '')) 
        })
        rowIndex===rows.length-1 ? null : list[rowIndex+1]=list[rowIndex+1].concat('\r', '\n')
    })
    
    list.forEach((item, index)=>{
        !rez.includes(item) ? rez.push(item) : null
    })

    fs.writeFile('filteredList.csv', rez.join(''), (error)=>{
        if(error) throw error
        console.log('File is created successfully.');
    })
})
