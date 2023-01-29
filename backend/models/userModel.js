module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define("user",{
     
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },

       name: {
            type:DataTypes.STRING,
            allowNull: false
        },
      
        username: {
            type: DataTypes.STRING,
            allowNull: false,
             unique: true
        
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        proPic: {
            type: DataTypes.STRING,
            allowNull: true,
        }


        
        


    });

    return User;
}


//id,name,username,password,bio,proPic