const sequelize = require('../config/config');

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

const read = () => {
    return Hero.findAll({where:
        {_deletedAt: {
            [Op.is]: null
        }
    }});
};

const add = ({id, name}) => {
    const res = Hero.create({
        id: id,
        name: name,
        _deletedAt: null
    });

    return res;
};

const update = ({id, name, _deletedAt}) => {
    const valuesToUpdate = {
        name,
        _deletedAt,
    };
    const changedValues = Object.keys(valuesToUpdate).reduce((accum, current) => {
        if (valuesToUpdate[current] !== undefined) {
            accum[current] = valuesToUpdate[current];
        }

        return accum;
    }, {});

    return Hero.update(changedValues, {
        where: {
            id: id
        }
    })
};

const remove = async (id) => {
    return await update({ id, _deletedAt: Date.now() });
};

const service = {
    read,
    add,
    update,
    remove,
};

module.exports = service;
