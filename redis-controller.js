const res = require("express/lib/response")
const Redis = require("ioredis")

const cluster = new Redis.Cluster([
    {
        port: 6373,
        host: "192.168.86.31"
    },
    {
        port: 6374,
        host: "192.168.86.32"
    },
    {
        port: 6375,
        host: "192.168.86.33"
    },
    {
        port: 6376,
        host: "192.168.86.34"
    },
    {
        port: 6377,
        host: "192.168.86.35"
    },
    {
        port: 6378,
        host: "192.168.86.36"
    }
])

exports.add = ({key, value} ) =>{
    console.log(`key: ${key} and value: ${value}`)
    cluster.set(key, value)
}

exports.get = async (key) => {
    console.log("this is the key", key)
    result = new Promise( (resolve, reject) => {
        cluster.get(key, (err, message) => {
            if (err) {
                reject(err)
            }

            resolve(message)
        })
    })

    return result
}

exports.flush = () => {
    cluster.flushall().then(status => {
        return status
    })
}

exports.flushAll = () => {
   const masters = cluster.nodes("master")
    Promise.all(masters.map((node) => node.flushall()))
}
