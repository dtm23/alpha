
module.exports = function() {
    return {
        index: function(req, res){
            res.render('index', { title: 'Project Alpha' });
        }
    };
};
