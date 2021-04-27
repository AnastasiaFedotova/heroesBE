const { Sequelize, Op, DataTypes } = require('sequelize');
const sequelize = new Sequelize('heroesdb', 'postgres', '1321081Aa', {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: false
    }
});

const Hero = sequelize.define('heroes', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    _deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err => console.log(err));

const readListHeroes = () => {
    return Hero.findAll({where:
        {_deletedAt: {
            [Op.is]: null
        }
    }});
};

const createHero = ({id, name}) => {
    const res = Hero.create({
        id: id,
        name: name,
        _deletedAt: null
    });

    return res;
};

const updateHero = ({id, name, _deletedAt}) => {
    const valuesToUpdate = {
        name,
        _deletedAt,
    };
    const omited = Object.keys(valuesToUpdate).reduce((accum, current) => {
        if (valuesToUpdate[current] !== undefined) {
            accum[current] = valuesToUpdate[current];
        }

        return accum;
    }, {});

    return Hero.update(omited, {
        where: {
            id: id
        }
    })
};

const removeHero = async (id) => {
    return await updateHero({ id, _deletedAt: Date.now() });
};

const service = {
    readListHeroes,
    createHero,
    updateHero,
    removeHero,
};

module.exports = service;
