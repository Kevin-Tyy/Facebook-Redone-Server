const { Router } = require("express");

const SearchApi = require("../services/SearchApi");

const SearchRoute = Router();
SearchRoute.route("/").get(SearchApi);

module.exports = SearchRoute;
