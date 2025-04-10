
export default function logout(req, res) {
    req.session.destroy();
    res.clearCookie('token');
    res.sendStatus(200);
}