var NodeJs_Dich_vu = require("http")
//var Luu_tru = require("../Xu_ly/XL_LUU_TRU")
var Luu_tru = require("../Xu_ly/XL_LUU_TRU_MONGODB")
//var Port = 1000
var Port = normalizePort(process.env.PORT || 10000);
var Xu_ly_Tham_so = require('querystring')
var Du_lieu = {}
// Promise
/*
Luu_tru.Doc_Thong_tin_Cua_hang().then(result =>{
  Du_lieu.Cua_hang=result[0]; 
  Luu_tru.Doc_Danh_sach_Dien_thoai().then(result=>{
    Du_lieu.Danh_sach_Dien_thoai=result;
  })
})
*/
async function Khoi_Dong_du_lieu() {
  let Cuahang = await Luu_tru.Doc_Thong_tin_Cua_hang()
  let dsDienthoai = await Luu_tru.Doc_Danh_sach_Dien_thoai()
  Du_lieu.Cua_hang=Cuahang[0]
  Du_lieu.Danh_sach_Dien_thoai=dsDienthoai
}
Khoi_Dong_du_lieu()

/*doc file 
Du_lieu.Danh_sach_Dien_thoai = Luu_tru.Doc_Du_lieu("Dien_thoai")
Du_lieu.Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()
*/
var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = ""
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
  Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
  Yeu_cau.on('end', () => {
    var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
    var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
    var Chuoi_Kq = ""
    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    if (Ma_so_Xu_ly == "DOC_DANH_SACH_DIEN_THOAI") {
      Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
      Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
      Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
      var Danh_sach_Dien_thoai = {}
      Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai
      Chuoi_Kq = JSON.stringify(Danh_sach_Dien_thoai)
      Dap_ung.end(Chuoi_Kq);
    } else if (Ma_so_Xu_ly == "DOC_CUA_HANG") {
      var Cua_hang = {}
      Cua_hang = Du_lieu.Cua_hang
      Chuoi_Kq = JSON.stringify(Cua_hang)
      Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
      Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
      Dap_ung.end(Chuoi_Kq);
    }else {
      Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
      Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
      Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
      Dap_ung.end(Chuoi_Kq);
    }
  })
})

Dich_vu.listen(Port,
  console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
);
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);
function onError(error) {
  if (error.syscall !== 'listen') {
      throw error;
  }

  var bind = typeof Port === 'string'
      ? 'Pipe ' + Port
      : 'Port ' + Port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
      case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
      case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
      default:
          throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = Dich_vu.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

