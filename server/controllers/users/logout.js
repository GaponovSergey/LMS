
export default function logout(req, res) {
    
    res.clearCookie('token');
    res.sendStatus(200);
}