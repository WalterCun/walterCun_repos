module.export = ()=>{
    const data = {
        repositories:[]
    }

    const total = 50;
    for (let i = 1; i < total+1; i=+3){
        data.repositories.push(
            {
                "id":i,
                "state": 604
            },{
                "id":i+1,
                "state": 605
            },{
                "id":i+2,
                "state": 606
            }
        )
    }

}