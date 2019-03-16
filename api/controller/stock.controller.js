
Stock = require('../model/stock');

const LIMIT = 500;
const DEFAULT_TOP_STOCKS_DATE = '2016-12-30';
const TOP_STOCKS_LIMIT = 10;

topStockCompare = function(a, b) {
    const gainA = (a.close - a.open)/((a.close + a.open)/2.0);
    const gainB = (b.close - b.open)/((b.close + b.open)/2.0);
    return (gainA > gainB) ? -1 : 1;
};

exports.index = function (request, response) {
    let options = {
        limit: LIMIT
    };
    if (request.query.page) {
        options.skip = LIMIT * request.query.page;
    }
    Stock.find({}, {}, options, function (error, stocks) {
        if (error) {
            response.json(error);
        }
        response.json(stocks);
    });
};

exports.count = function (request, response) {
    Stock.count({}, function (error, count) {
        if (error) {
            response.json(error);
        }
        response.json(count);
    });
};

exports.list = function (request, response) {
    Stock.distinct('symbol', function (error, stockSymbols) {
        if (error) {
            response.json(error);
        }
        response.json(stockSymbols);
    });
};

exports.search = function (request, response) {
    let query = {};
    if (request.query.symbol) {
        query.symbol = { $in:  request.query.symbol };
    }
    if (request.query.dateFrom || request.query.dateTo) {
        // query.date = request.query.dateFrom;
        query.date = {};
        if (request.query.dateFrom) { query.date.$gte = request.query.dateFrom; }
        if (request.query.dateTo) { query.date.$lte = request.query.dateTo; }
    }
    if (request.query.volume) {
        query.volume = Number(request.query.volume);
    }
    let options = {
        limit: LIMIT
    };
    if (request.query.page) {
        options.skip = LIMIT * request.query.page;
    }
    Stock.find(query, {}, options, function (error, stocks) {
        if (error) {
            response.json(error);
        }
        response.json(stocks);
    });
};

exports.top = function (request, response) {
    let query = {
        date: DEFAULT_TOP_STOCKS_DATE
    };
    if (request.query.date) {
        query.date = request.query.date;
    }
    Stock.find(query, {}, {}, function (error, stocks) {
        if (error) {
            response.json(error);
        }
        response.json(stocks.sort(topStockCompare).slice(0, TOP_STOCKS_LIMIT));
    });
};

exports.bookmarks = function (request, response) {
    let options = {
        limit: 10
    };
    Stock.find({}, {}, options, function (error, stocks) {
        if (error) {
            response.json(error);
        }
        response.json(stocks);
    });
};

modifyDocuments = function (request, response) {
    let options = {
        limit: 100000
    };
    if (request.query.page) {
        options.skip = options.limit * request.query.page;
    }
    let count = 0;
    Stock.find({}, {}, options, function (error, stocks) {
        stocks.forEach(function (stock) {
            stock.date = new Date(stock.date);
            stock.save();
            console.log(++count);
        });
        response.json(count);
    });
};
