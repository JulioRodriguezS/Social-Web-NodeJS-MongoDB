const express = require("express")
const config = require("./server/config")
//db connection
require('./database')

//starting server
const app = config(express())

