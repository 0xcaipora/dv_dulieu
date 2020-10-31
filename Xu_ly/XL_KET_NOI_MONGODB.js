var MongoClient = require('mongodb').MongoClient;

var DbConnection = function () {
    var db = null
    var instance = 0
    async function DbConnect() {
        try {
            
            var url=`mongodb+srv://Ox123:Chi12345@cluster0.omr3g.mongodb.net/Ban_Dien_thoai?retryWrites=true&w=majority`
            var _db = await MongoClient.connect(url,{ useUnifiedTopology: true } )
            return _db.db(`Ban_Dien_thoai`)
        } catch (Loi) {
            return Loi
        }
    }

    async function Get() {
        try {
            instance++
            console.log(`số lượng gọi đến kết nối CSDL: ${instance} lần`)

            if (db != null) {
                console.log(`kết nối CSDL đã tồn tại`)
                return db
            } else {
                console.log(`tạo một kết nối CSDL mới`)
                db = await DbConnect()
                return db
            }
        } catch (Loi) {
            return Loi
        }
    }

    return {
        Get: Get
    }
}
//DbConnection().Get(); // Test
module.exports = DbConnection();