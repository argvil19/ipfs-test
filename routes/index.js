const express = require('express')
const IPFS = require('ipfs')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = (app) => {
  const node =  new IPFS()

  app.post('/', upload.single('file'), async (req, res, next) => {
    await node.ready

    const file = await node.add(req.file.buffer)
    return res.send(file)
  })

  app.get('/', async (req, res, next) => {
    await node.ready

    const file = await node.cat(req.query.id)

    return res.send(file)
  })
}
