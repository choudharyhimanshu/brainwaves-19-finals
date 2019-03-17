const fs = require('fs');

SGMessage = require('../model/sg-data');
ClientMessage = require('../model/client-data');

const PATH_SG_DATA = 'data/sg/';
const PATH_CLIENT_DATA = 'data/client/';

const LIMIT = 50;

exports.clearMessages = function (request, response) {
    SGMessage.collection.drop();
    ClientMessage.collection.drop();
    response.json('DONE');
}

exports.dumpSgMessages = function (request, response) {
    fs.readdir(PATH_SG_DATA, (err, files) => {
        fileContents = '';
        files.forEach(file => {
            fs.readFile(PATH_SG_DATA + file, {encoding: 'utf-8'}, function(err, content) {
                if (!err) {
                    lines = content.split('\n');
                    const model = {};
                    for (let i = 1; i < lines.length - 1; i++) {
                        const data = lines[i].split(':');
                        model['Key_' + data[1]] = data[2];
                    }
                    const message = new SGMessage(model);
                    message.save(function (error, message) {
                       if (error) {
                           console.error(error);
                       } else {
                           console.log(message);
                       }
                    });
                }
            });
        });
        response.json(files);
    });
};

exports.dumpClientMessages = function (request, response) {
    fs.readdir(PATH_CLIENT_DATA, (err, files) => {
        fileContents = '';
        files.forEach(file => {
            fs.readFile(PATH_CLIENT_DATA + file, {encoding: 'utf-8'}, function(err, content) {
                if (!err) {
                    lines = content.split('\n');
                    const model = {};
                    for (let i = 1; i < lines.length - 1; i++) {
                        const data = lines[i].split(':');
                        model['Key_' + data[1]] = data[2];
                    }
                    const message = new ClientMessage(model);
                    message.save(function (error, message) {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(message);
                        }
                    });
                }
            });
        });
        response.json(files);
    });
};

exports.loadSgMessages = function (request, response) {
    SGMessage.find({}, {}, {}, function (error, messages) {
        if (error) {
            response.json(error);
        }
        response.json(messages);
    });
};

exports.loadClientMessages = function (request, response) {
    ClientMessage.find({}, {}, {}, function (error, messages) {
        if (error) {
            response.json(error);
        }
        response.json(messages);
    });
};

exports.countSgMessages = function (request, response) {
    SGMessage.count({}, function (error, count) {
        if (error) {
            response.json(error);
        }
        response.json(count);
    });
};

exports.countClientMessages = function (request, response) {
    ClientMessage.count({}, function (error, count) {
        if (error) {
            response.json(error);
        }
        response.json(count);
    });
};

exports.searchMessages = function (request, response) {
    let query = {};
    if (request.query.Key_20) {
        query.Key_20 = request.query.Key_20;
    }
    if (request.query.Key_30T) {
        query.Key_30T = {};
        const tradeDateRange = request.query.Key_30T.split(' - ');
        if (tradeDateRange[0]) {
            query.Key_30T.$gte = tradeDateRange[0];
        }
        if (tradeDateRange[1]) {
            query.Key_30T.$lte = tradeDateRange[1];
        }
    }

    let options = {
        limit: LIMIT
    };

    SGMessage.find(query, {}, options, function (error, messages) {
        if (error) {
            response.json(error);
        }
        ClientMessage.find({}, {}, {}, function (error, clientMessages) {
            if (error) {
                response.json(error);
            }
            for (let i = 0; i < messages.length; i++) {
                messages[i].status = 'unreviewed';
                const [ccy1, amount1] = messages[i].Key_32B.split(' ');
                const [ccy2, amount2] = messages[i].Key_33B.split(' ');
                const valueDate = messages[i].Key_30V;
                const excRate = messages[i].Key_36;
                for (let j = 0; j < clientMessages.length; j++) {
                    if (clientMessages[j].status === 'matched') {
                        continue;
                    }
                    const [clientccy1, clientamount1] = clientMessages[j].Key_32B.split(' ');
                    const [clientccy2, clientamount2] = clientMessages[j].Key_33B.split(' ');
                    if (ccy1 === clientccy2 && ccy2 === clientccy1 && amount1 === clientamount2 && amount2 === clientamount1) {
                        messages[i].status = 'matched';
                        clientMessages[j].status = 'matched';
                        messages[i].clientRef = clientMessages[j].Key_20;
                        break;
                    }
                    if ((valueDate === clientMessages[j].Key_30V && excRate === clientMessages[j].Key_36) || (amount1 === clientamount2) || (amount2 === clientamount1)) {
                        messages[i].status = 'closefit';
                        messages[i].clientRef = clientMessages[j].Key_20;
                    }
                }
            }
            if (request.query.status) {
                response.json(messages.filter(message => message.status === request.query.status));
            } else {
                response.json(messages);
            }
        });
    });
};

exports.getSgMessageByRef = function (request, response) {
    SGMessage.findOne({Key_20: request.params.id}, function (error, message) {
        if (error) {
            response.json(error);
        }
        setTimeout(function () {
            response.json(message);
        }, 1000);
    });
};

exports.getClientMessageByRef = function (request, response) {
    ClientMessage.findOne({Key_20: request.params.id}, function (error, message) {
        if (error) {
            response.json(error);
        }
        setTimeout(function () {
            response.json(message);
        }, 1000);
    });
};
