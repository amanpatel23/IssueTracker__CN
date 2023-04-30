
// custome middleware for flashing the messages on screen
module.exports.setFlash = function(request, response, next) {
    response.locals.flash = {
        'success': request.flash('success'),
        'error': request.flash('error')
    }
    next();
}