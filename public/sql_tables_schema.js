const SQL_TABLES_SCHEMA = [
  {
    "id": "DM_HeDaoTao",
    "name": "DM_HeDaoTao",
    "title": "Bậc đào tạo / Hệ đào tạo",
    "group": "general",
    "x": 60,
    "y": 100,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaHeDaoTao",
        "type": "varchar(10)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenHeDaoTao",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "DaoTaoMonVanHoa",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMau",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HinhThucDaoTao",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaSinhVien",
        "type": "varchar(4)",
        "key": "",
        "visible": true
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaHoSoTuyenSinh",
        "type": "varchar(4)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "TenLoaiBangCapTN",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenLoaiBangCapTN_ENG",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaMonHoc",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "PhongBanKyBM01",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuBanSao",
        "type": "nvarchar(16)",
        "key": "",
        "visible": false
      },
      {
        "name": "BacTrinhDo",
        "type": "int",
        "key": "",
        "visible": true
      }
    ],
    "relations": []
  },
  {
    "id": "DM_LoaiHinhDT",
    "name": "DM_LoaiHinhDT",
    "title": "Loại hình đào tạo",
    "group": "general",
    "x": 60,
    "y": 310,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaLoaiHinhDT",
        "type": "varchar(10)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenLoaiHinhDT",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "LoaiHocChung",
        "type": "varchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "HinhThuc",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaHoSoTuyenSinh",
        "type": "nvarchar(4)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiNganSach",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_ThoiGianDaoTao",
    "name": "DM_ThoiGianDaoTao",
    "title": "Thời gian kế hoạch đào tạo",
    "group": "general",
    "x": 380,
    "y": 100,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "ThoiGianKeHoach",
        "type": "decimal(3)",
        "key": "",
        "visible": true
      },
      {
        "name": "ThoiGianToiDa",
        "type": "decimal(3)",
        "key": "",
        "visible": true
      },
      {
        "name": "ThoiGianToiThieu",
        "type": "decimal(3)",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaSinhVien",
        "type": "varchar(4)",
        "key": "",
        "visible": false
      },
      {
        "name": "HanCheDKHP",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMau",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMauBangDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMauBangTN",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMauBangDiemTN",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoDaoTao",
        "type": "decimal(5)",
        "key": "",
        "visible": true
      },
      {
        "name": "NgayHetHan",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiNganh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBangDiem01",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBangDiem02",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBangDiemTN01",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBangDiemTN02",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDPhuLucVanBang",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChoPhepHocVuot",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "STCTLQDMoiNam",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_Nganh",
    "name": "DM_Nganh",
    "title": "Ngành đào tạo chuyên môn",
    "group": "majors",
    "x": 380,
    "y": 310,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaNganh",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenNganh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "MaTuyenSinh",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "Khoi",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuMaSinhVien",
        "type": "varchar(10)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiNganh",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "TenVietTat",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuSBDTotNghiep",
        "type": "nvarchar(10)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SoQuyetDinh",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiKy",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKy",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLinhVuc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TenHienThi",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsXetHocBongBanPhan",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHBBanPhan",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_HeDaoTao",
        "fromCol": "IDHeDaoTao",
        "toCol": "Id"
      },
      {
        "toTable": "DM_KhoiNganh",
        "fromCol": "IDKhoiNganh",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_ChuyenNganhChiTiet",
    "name": "DM_ChuyenNganhChiTiet",
    "title": "Chuyên ngành chi tiết (Nghề)",
    "group": "majors",
    "x": 380,
    "y": 500,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaChuyenNganh",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenChuyenNganh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenVietTat",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_Nganh",
        "fromCol": "IDNganh",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_NamHoc",
    "name": "DM_NamHoc",
    "title": "Năm học niên khóa",
    "group": "general",
    "x": 60,
    "y": 660,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "NamHoc",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "NienHoc",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "date",
        "key": "",
        "visible": false
      },
      {
        "name": "TuNgay",
        "type": "datetime",
        "key": "",
        "visible": true
      },
      {
        "name": "DenNgay",
        "type": "datetime",
        "key": "",
        "visible": true
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "MaNamHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_KhoaHoc",
    "name": "DM_KhoaHoc",
    "title": "Khóa học học viên",
    "group": "general",
    "x": 60,
    "y": 860,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "TenKhoaHoc",
        "type": "nvarchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "Nam",
        "type": "smallint",
        "key": "",
        "visible": true
      },
      {
        "name": "CachViet",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_Dot",
    "name": "DM_Dot",
    "title": "Đợt / Học kỳ tuyển sinh",
    "group": "general",
    "x": 380,
    "y": 660,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "SoThuTu",
        "type": "smallint",
        "key": "",
        "visible": false
      },
      {
        "name": "TenDot",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "IDNamHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IsActive",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDangKyHocPhan",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuan",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "HeSo",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DenThang",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuThang",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HBDuKien",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HBSinhVien",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenDayDu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NamHanhChinh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DenNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChoPhepDKNTTT",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "MaDot",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HBTrangThaiSVPB",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHHMienGiam",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TuThangDT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DenThangDT",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_NamHoc",
        "fromCol": "IDNamHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_KhoiKienThuc",
    "name": "DM_KhoiKienThuc",
    "title": "Khối kiến thức khung chương trình",
    "group": "subjects",
    "x": 690,
    "y": 10,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaKhoiKienThuc",
        "type": "nvarchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenKhoiKienThuc",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDeleted",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsMonChung",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_HinhThucThi",
    "name": "DM_HinhThucThi",
    "title": "Hình thức thi & Số GV chấm",
    "group": "subjects",
    "x": 380,
    "y": 10,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaHinhThucThi",
        "type": "nvarchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenHinhThucThi",
        "type": "nvarchar(200)",
        "key": "",
        "visible": true
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoChamThi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoGiangVien",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMauDanhSachDuThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBieuMauDeThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsToChucThi",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "DonGia",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoSinhVien",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongDKPK",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SoNgayNhapDiem",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_TinhChatMonHoc",
    "name": "DM_TinhChatMonHoc",
    "title": "Tính chất môn học",
    "group": "subjects",
    "x": 1000,
    "y": 10,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaTinhChat",
        "type": "varchar(10)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenTinhChat",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLT",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSTH",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSQuyDoi",
        "type": "decimal(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "CongThuc",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "ListIDLoaiCongViecKhac",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLTTG",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSTHTG",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_QuyDinhKhoaNganh",
    "name": "DM_QuyDinhKhoaNganh",
    "title": "Quy định Khóa - Ngành học",
    "group": "majors",
    "x": 690,
    "y": 550,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "STCMienGiamNganh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "DonGiaMienGiamNganh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "STCXetHocBong",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDLoaiHinhDaoTao",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "HocKy",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNghe",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCXetHocBongNamHoc",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "STCXetHocBongKhoaHoc",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "DKCNTuNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DKCNDenNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_KhoaHoc",
        "fromCol": "IDKhoaHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_HeDaoTao",
        "fromCol": "IDHeDaoTao",
        "toCol": "Id"
      },
      {
        "toTable": "DM_LoaiHinhDT",
        "fromCol": "IDLoaiHinhDT",
        "toCol": "Id"
      },
      {
        "toTable": "DM_Nganh",
        "fromCol": "IDNganh",
        "toCol": "Id"
      },
      {
        "toTable": "DM_Dot",
        "fromCol": "IDDot",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_KhoiNganh",
    "name": "DM_KhoiNganh",
    "title": "Khối ngành học",
    "group": "general",
    "x": 60,
    "y": 480,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaKhoiNganh",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenKhoiNganh",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TongSoTinChi",
        "type": "decimal(18)",
        "key": "",
        "visible": true
      },
      {
        "name": "DonGiaHocPhi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsSuPham",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "TenLoaiBangCapTN",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenLoaiBangCapTN_ENG",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "PrefixSoHieuVB",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_NhomMienGiam",
    "name": "DM_NhomMienGiam",
    "title": "Nhóm miễn giảm học phí",
    "group": "general",
    "x": 478,
    "y": 542,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaNhomMienGiam",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenNhomMienGiam",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsMienHocPhi",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_MonHoc",
    "name": "DM_MonHoc",
    "title": "Danh sách môn học chính thức",
    "group": "subjects",
    "x": 690,
    "y": 150,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaMonHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenMonHoc",
        "type": "nvarchar(200)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaTuQuan",
        "type": "nvarchar(1000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDToBoMon",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiKienThuc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "TenVietTat",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongTinhDiemTBC",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsBatBuocDangKy",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiTiet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongXetDuThiTN",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SearchMonHoc01",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "SearchMonHoc02",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "ChuNhiemMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LyThuyet",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChi",
        "type": "varchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThucHanh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongSuDung",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongSuDungBaiHoc",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongRangBuocTienDoDT",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNgonNguDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHocXepLichThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsMonThiTotNghiep",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_TinhChatMonHoc",
        "fromCol": "IDTinhChatMonHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_KhoiKienThuc",
        "fromCol": "IDKhoiKienThuc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_MonHocHeDaoTao",
    "name": "DM_MonHocHeDaoTao",
    "title": "Môn học cấu hình bậc đào tạo",
    "group": "subjects",
    "x": 1000,
    "y": 150,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "DVHT",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "SoLanKTDinhKy",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "LyThuyet",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "TuHoc",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThucHanh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "MoRong",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChi",
        "type": "varchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTietLyThuyet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietThucHanh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietLTT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTHBT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TenFileNoiDung",
        "type": "varchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NoiDungFile",
        "type": "varbinary(MAX)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLyThuyet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHinhThucThi",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDQuyUocCotDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTuHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoGioThucTap",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiTiet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoGioDoAnBTLon",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhGiangDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietKT",
        "type": "varchar(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_HP",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhanSuNhapDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongTinhDiemTBC",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "ListIDNhanSuNhapDiem",
        "type": "varchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "ChuNhiemMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ListIDNhanSuNhapDiemCK",
        "type": "varchar(500)",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_HeDaoTao",
        "fromCol": "IDHeDaoTao",
        "toCol": "Id"
      },
      {
        "toTable": "DM_HinhThucThi",
        "fromCol": "IDHinhThucThi",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_MonHocNgoaiChuongTrinh",
    "name": "DM_MonHocNgoaiChuongTrinh",
    "title": "Môn học ngoài chương trình",
    "group": "subjects",
    "x": 589,
    "y": 294,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDLoaiMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhan",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "MaMonHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenMonHoc",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChi",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietLyThuyet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietThucHanh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLyThuyet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhomMonHocDieuKien",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "CapDo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuDiem",
        "type": "decimal(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "DenDiem",
        "type": "decimal(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHinhThucThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HSMH",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDToBoMon",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DsHeDaoTao",
        "type": "varchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChungChi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTHBT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDQuyUocCotDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TenMonTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_NhomMonHocDieuKien",
    "name": "DM_NhomMonHocDieuKien",
    "title": "Nhóm môn học điều kiện",
    "group": "general",
    "x": 692,
    "y": 192,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaNhom",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenNhom",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DT_MonHocThayThe",
    "name": "DT_MonHocThayThe",
    "title": "Bảng cấu hình môn học thay thế",
    "group": "subjects",
    "x": 619,
    "y": 228,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNghe",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHocGocList",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "MaMonHocGocList",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHocThayTheList",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "MaMonHocThayTheList",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DT_MonHocModule",
    "name": "DT_MonHocModule",
    "title": "Bảng môn học dạng module tích hợp",
    "group": "subjects",
    "x": 690,
    "y": 830,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "CongThucTinh",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_ChiTietMonHocModule",
    "name": "DT_ChiTietMonHocModule",
    "title": "Chi tiết các môn thành phần",
    "group": "general",
    "x": 1000,
    "y": 830,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDMonHocModule",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "TrongSoTinhDiem",
        "type": "decimal(18)",
        "key": "",
        "visible": true
      },
      {
        "name": "TrongSoHocPhi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsBatBuocHocChung",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KyTuCongThuc",
        "type": "varchar(10)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSo",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_MonHocModule",
        "fromCol": "IDMonHocModule",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_CTK_NhomTuChon",
    "name": "DT_CTK_NhomTuChon",
    "title": "Nhóm môn học tự chọn của CTK",
    "group": "curriculum",
    "x": 1300,
    "y": 570,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDKhungHocKy",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "Nhom",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCBatBuocCuaNhom",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NhomCapDo2",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCBatBuocNhomCapDo2",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChuongTrinhKhung",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "TenNhomTuChon",
        "type": "nvarchar(500)",
        "key": "",
        "visible": true
      },
      {
        "name": "NhomCha",
        "type": "varchar(10)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STTText",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCachXetTN",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCBatBuocCuaNhom_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhomCha",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsParent",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "STCBatBuocToiDa",
        "type": "decimal(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "NhomDinhHuongTuChon",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_ChuongTrinhKhung",
        "fromCol": "IDChuongTrinhKhung",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_CTK_ChiTietNhomTuChon",
    "name": "DT_CTK_ChiTietNhomTuChon",
    "title": "Chi tiết các môn thuộc nhóm tự chọn",
    "group": "curriculum",
    "x": 1600,
    "y": 570,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDNhomTuChon",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDChiTietKhungHocKy",
        "type": "bigint",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_CTK_NhomTuChon",
        "fromCol": "IDNhomTuChon",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DM_MonHocRangBuoc",
    "name": "DM_MonHocRangBuoc",
    "title": "Môn học trước / Tiên quyết / Song hành",
    "group": "subjects",
    "x": 690,
    "y": 360,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDMonHocTruoc",
        "type": "varchar(2000)",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHocTienQuyet",
        "type": "varchar(2000)",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHocSongHanh",
        "type": "varchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHocTuongDuong",
        "type": "varchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHocRangBuoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_ChuongTrinhKhung",
    "name": "DT_ChuongTrinhKhung",
    "title": "Chương trình khung khóa - ngành",
    "group": "curriculum",
    "x": 1300,
    "y": 150,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDNghe",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLock",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "MaChuongTrinhKhung",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "TenChuongTrinhKhung",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "MucTieuChung",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "MucTieuCuThe",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "ViTriLamViecSauTN",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "DoiTuongTuyenSinh",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNgonNguDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ApDungDonGia",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiDinhHuong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTemplateCTK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu02",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiVanBang",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ThoiGianKeHoach",
        "type": "decimal(3)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThoiGianToiDa",
        "type": "decimal(3)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThoiGianToiThieu",
        "type": "decimal(3)",
        "key": "",
        "visible": false
      },
      {
        "name": "STCTLQDMoiNam",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_CoSo",
        "fromCol": "IDCoSo",
        "toCol": "Id"
      },
      {
        "toTable": "DM_KhoaHoc",
        "fromCol": "IDKhoaHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_HeDaoTao",
        "fromCol": "IDHeDaoTao",
        "toCol": "Id"
      },
      {
        "toTable": "DM_LoaiHinhDT",
        "fromCol": "IDLoaiHinhDT",
        "toCol": "Id"
      },
      {
        "toTable": "DM_Nganh",
        "fromCol": "IDNganh",
        "toCol": "Id"
      },
      {
        "toTable": "DM_ChuyenNganhChiTiet",
        "fromCol": "IDNghe",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_KhungHocKy",
    "name": "DT_KhungHocKy",
    "title": "Khung học kỳ thuộc CTK",
    "group": "curriculum",
    "x": 1600,
    "y": 150,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDChuongTrinhKhung",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "NamHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HocKy",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTCBatBuoc",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTCTuChon",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDDot",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ThuTuHocKy",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTCBatBuoc_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTCTuChon_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_ChuongTrinhKhung",
        "fromCol": "IDChuongTrinhKhung",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_ChiTietKhungHocKy",
    "name": "DT_ChiTietKhungHocKy",
    "title": "Môn học chi tiết thuộc Học kỳ CTK",
    "group": "curriculum",
    "x": 1600,
    "y": 350,
    "columns": [
      {
        "name": "Id",
        "type": "bigint",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDKhungHocKy",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "MaMonHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenMonHoc",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhan",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "LoaiHocPhan",
        "type": "bit",
        "key": "",
        "visible": true
      },
      {
        "name": "DVHT",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "SoLanKTDinhKy",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "LyThuyet",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "TuHoc",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThucHanh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "MoRong",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChi",
        "type": "varchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTietLyThuyet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietThucHanh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietLTT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTHBT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanTruoc",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanTienQuyet",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanSongHanh",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TLBTL",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "CoDiemThucHanh",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "ChiDiemCuoiKy",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongTinhDiemTBC",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiGiuaKy",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiThucHanh",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiCuoiKy",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "DinhHuongTuChon",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLyThuyet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHocTuongDuong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhanTuongDuong",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoNhomTuChon",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoDVHTTuChon",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHinhThucThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiKienThuc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDQuyUocCotDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTuHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TenVietTatMonHoc",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDDeCuongMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiTiet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChiTietKhungParent",
        "type": "bigint",
        "key": "",
        "visible": false
      },
      {
        "name": "TrongSoTinhDiem",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "TrongSoHocPhi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsBatBuocHocChung",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhGiangDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietKT",
        "type": "varchar(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_HP",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoDVHTTuChon_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "STT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiKienThuc_CTK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiMonHoc_CTK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DotThuTuHocKy",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsTuChonBatBuoc",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocPhanCotLoi",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_KhungHocKy",
        "fromCol": "IDKhungHocKy",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "KT_NC_KeHoachDaoTao",
    "name": "KT_NC_KeHoachDaoTao",
    "title": "Kế hoạch đào tạo chi tiết",
    "group": "curriculum",
    "x": 1300,
    "y": 380,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "HocKy",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDDot",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "SoTCDKToiDa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoCapNhat",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "TienQuyHocBong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsMienHocPhi",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChiCanhBao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongXetHB",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsCongBoTKHK",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongRBMHTQ",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongRBMHTQ_TuNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongRBMHTQ_DenNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DKHP_IsKhongCheckNoHP",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "DonGiaMienGiam",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongRBMHTruoc",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongRBMHTruoc_TuNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongRBMHTruoc_DenNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KhoiPhucDKHPTuNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "KhoiPhucDKHPDenNgay",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DaDongBoHuyKhoiPhucDKHP",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_Dot",
        "fromCol": "IDDot",
        "toCol": "Id"
      },
      {
        "toTable": "DM_Nganh",
        "fromCol": "IDNganh",
        "toCol": "Id"
      },
      {
        "toTable": "DM_KhoaHoc",
        "fromCol": "IDKhoaHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_HeLoaiHocChung",
    "name": "DT_HeLoaiHocChung",
    "title": "Cấu hình môn học chung bậc loại",
    "group": "general",
    "x": 291,
    "y": 313,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHeHocChung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHocChung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhanHocChung",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDeleted",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DT_QuyDinhDaoTao",
    "name": "DT_QuyDinhDaoTao",
    "title": "Quy định đào tạo",
    "group": "general",
    "x": 264,
    "y": 283,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDDot",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNghe",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCHocMoi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCHocLai",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "STCHocCaiThien",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ST01",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "ST02",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "ST03",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoCapNhat",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_LopHoc",
    "name": "DM_LopHoc",
    "title": "Danh mục lớp học chính thức",
    "group": "classes",
    "x": 1900,
    "y": 150,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "MaLopChu",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "MaLopSo",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenLop",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "GVCN",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "CoVanLopHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SiSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCoSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDLoaiHinhDT",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDNganh",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDNghe",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "SoNhom",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsVisible",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCaHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "LienHeGVCN",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "LienHeCVHT",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoThayDoiSiSo",
        "type": "nvarchar(MAX)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenTiengAnh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayNhapHocLopHoc",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "SoHopDong",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHopDong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "SoQuyetDinh",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayRaQuyetDinh",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSo",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "MucPhuThu",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDDonViLienKet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayBatDauDKTS",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKetThucDKTS",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "GioNhapHocLopHoc",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoQD_CVHT",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayQD_CVHT",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayBatDauTGDT",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKetThucTGDT",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "ThoiGianDT",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoQDPhanCong",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayQDPhanCong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TruongBoMon",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_KhoaHoc",
        "fromCol": "IDKhoaHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_HeDaoTao",
        "fromCol": "IDHeDaoTao",
        "toCol": "Id"
      },
      {
        "toTable": "DM_LoaiHinhDT",
        "fromCol": "IDLoaiHinhDT",
        "toCol": "Id"
      },
      {
        "toTable": "DM_Nganh",
        "fromCol": "IDNganh",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_PhanMonLopHoc",
    "name": "DT_PhanMonLopHoc",
    "title": "Phân môn lớp học kế hoạch",
    "group": "classes",
    "x": 1900,
    "y": 400,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDLopHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "HocKy",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTCBatBuoc",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTCTuChon",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTCBatBuoc_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTCTuChon_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_LopHoc",
        "fromCol": "IDLopHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "DT_ChiTietPhanMonLopHoc",
    "name": "DT_ChiTietPhanMonLopHoc",
    "title": "Bảng phân môn chi tiết cho Lớp học",
    "group": "classes",
    "x": 1900,
    "y": 600,
    "columns": [
      {
        "name": "Id",
        "type": "bigint",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDPhanMon",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "MaMonHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TenMonHoc",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhan",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "LoaiHocPhan",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "SoLanKTDinhKy",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "LyThuyet",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "TuHoc",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThucHanh",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "MoRong",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTinChi",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTietLyThuyet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietThucHanh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietLTT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTHBT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanTruoc",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanTienQuyet",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "HocPhanSongHanh",
        "type": "varchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "TLBTL",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "CoDiemThucHanh",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "ChiDiemCuoiKy",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "KhongTinhDiemTBC",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiGiuaKy",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiThucHanh",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "ThiCuoiKy",
        "type": "varchar(2)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLyThuyet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDMonHocTuongDuong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaHocPhanTuongDuong",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHinhThucThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoiKienThuc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietTuHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDQuyUocCotDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TenVietTatMonHoc",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_HP",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "DVHT_Le",
        "type": "decimal(7)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoNhomTuChonCTK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HocKyCTK",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DT_PhanMonLopHoc",
        "fromCol": "IDPhanMonLopHoc",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "TKB_MonHocGiangVien",
    "name": "TKB_MonHocGiangVien",
    "title": "Phân công giảng viên dạy môn",
    "group": "schedule",
    "x": 2200,
    "y": 170,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDGiangVien",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "FK",
        "visible": true
      },
      {
        "name": "IDHeDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiDaoTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDDot",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "SoTiet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TrangThai",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayDuyet",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiDuyet",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoCuaKhoa",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoCuaTruong",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "History",
        "type": "xml",
        "key": "",
        "visible": false
      },
      {
        "name": "SoThuTu",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoLuongLHP",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietLHP",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LopUuTien",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      }
    ],
    "relations": [
      {
        "toTable": "DM_GiangVien",
        "fromCol": "IDGiangVien",
        "toCol": "Id"
      },
      {
        "toTable": "DM_MonHoc",
        "fromCol": "IDMonHoc",
        "toCol": "Id"
      }
    ]
  },
  {
    "id": "TKB_LopHocPhan",
    "name": "TKB_LopHocPhan",
    "title": "Bảng thông tin Lớp học phần",
    "group": "schedule",
    "x": 2200,
    "y": 390,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDDot",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDMonHoc",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDTrangThaiLopHocPhan",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaLopHocPhan",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "ThuTuLopHocPhan",
        "type": "varchar(10)",
        "key": "",
        "visible": false
      },
      {
        "name": "LopDuKien",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "SiSoToiThieu",
        "type": "smallint",
        "key": "",
        "visible": false
      },
      {
        "name": "SiSoToiDa",
        "type": "smallint",
        "key": "",
        "visible": false
      },
      {
        "name": "LoaiLopHocPhan",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaChuQuan",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHetHanNopHP",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHetHanNopHP2",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsXepLich",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDanhGiaChatLuong",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChiDiemCuoiKy",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHP",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPK2",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPK4",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPR",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(1500)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChuLHP",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocCaSang",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocCaChieu",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocCaToi",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "SiSoDangKy",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IsTienDoDaoTaoRieng",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayBatDauTienDo",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKetThucTienDo",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TongSoTuan",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDCaHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPK1",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPK3",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSLHPK5",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoK1",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoK2",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoK3",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoK4",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoK5",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoLHP",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoR",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoPhutThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietThi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTinhChatMonHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDQuyUocCotDiem",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanDuTruCK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanDuTruGK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanThiCK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTuanThiGK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuanThiCK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuanThiGK",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DiemTBToiThieu",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietXepLichLT",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietXepLichTH",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "DonGiaHocPhi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChamCongNgoai",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChiTinhTroi",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHinhThucGiangDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "PhuPhi",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLopHocPhanDaHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLoaiHinhGiangDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHetHanDangKy",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TuNgayDKPK",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "DenNgayDKPK",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsQuyDoiRieng",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongPhanBo",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongChiaTT",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "HeSoHocPhiRieng",
        "type": "decimal(5)",
        "key": "",
        "visible": false
      },
      {
        "name": "HanDangKyHoanThi",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "HanDangKyDGL",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayThucTap",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsCongBoKetQuaKS",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "Text01",
        "type": "nvarchar(MAX)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongRangBuocTienDoDT",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChuCapNhatMucPhi",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhoaMucPhiDacBiet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLHPDiemQuaTrinh",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsNgoaiGio",
        "type": "bit",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "TKB_LichHoc",
    "name": "TKB_LichHoc",
    "title": "Lịch học chi tiết",
    "group": "schedule",
    "x": 2200,
    "y": 620,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDLopXepLichHoc",
        "type": "int",
        "key": "",
        "visible": true
      },
      {
        "name": "IDParentLichHoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "SiSo",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "Nhom",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "TuSiSo",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "Thu",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "TuTiet",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "DenTiet",
        "type": "tinyint",
        "key": "",
        "visible": true
      },
      {
        "name": "NgayBatDau",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKetThuc",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TongTietDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLyThuyet",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocCachTuan",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsHocBu",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiCapPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapPhong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsTuChoiCapPhong",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoTuChoiCapPhong",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTuChoiCapPhong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDKhoaCapPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiYeuCauCapPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayYeuCauCapPhong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHoanTat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiYeuCauHoanTat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayYeuCauHoanTat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiKyXacNhanHoanTat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKyXacNhanHoanTat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKyXacNhanHoanTat",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLichGoc",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLichHocThaoLuan",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayBatDauHoc",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKetThucHoc",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLichTheoNgay",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDeXuatTamNgung",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayDeXuatTamNgung",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDGiangVienDeXuatTamNgung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhanSuDeXuatTamNgung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LyDoTamNgung",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsTamNgung",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayKyTamNgung",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiKyTamNgung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhatKyTamNgung",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsCongBo",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsLichBaiTap",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDPhuongThucGiangDay",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "LinkOnline",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "LinkOnline1",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "LinkOnline2",
        "type": "nvarchar(2000)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text01",
        "type": "text",
        "key": "",
        "visible": false
      },
      {
        "name": "Text02",
        "type": "text",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNguoiTuChoiCapPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDBaiHocList",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChuCapNhat",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "MaLichHoc",
        "type": "nvarchar(50)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDPhongDoi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiDoiPhong",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayDoiPhong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChuDoiPhong",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDLichHocGoc",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "TuGio",
        "type": "time",
        "key": "",
        "visible": false
      },
      {
        "name": "DenGio",
        "type": "time",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDelete",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayXoa",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiXoa",
        "type": "int",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  },
  {
    "id": "DM_GiangVien",
    "name": "DM_GiangVien",
    "title": "Danh sách giảng viên",
    "group": "schedule",
    "x": 2200,
    "y": 10,
    "columns": [
      {
        "name": "Id",
        "type": "int",
        "key": "PK",
        "visible": true
      },
      {
        "name": "IDKhoa",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "MaGiangVien",
        "type": "varchar(20)",
        "key": "",
        "visible": true
      },
      {
        "name": "HoDem",
        "type": "nvarchar(100)",
        "key": "",
        "visible": true
      },
      {
        "name": "Ten",
        "type": "nvarchar(50)",
        "key": "",
        "visible": true
      },
      {
        "name": "LoaiGiangVien",
        "type": "tinyint",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayHetThuViec",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDeleted",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IsDisabled",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHocVi",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDHocHam",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsChamDutHopDong",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayChamDutHopDong",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "Email",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoDienThoai",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiTao",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayTao",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "NguoiCapNhat",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "NgayCapNhat",
        "type": "datetime",
        "key": "",
        "visible": false
      },
      {
        "name": "TenVietTat",
        "type": "nvarchar(100)",
        "key": "",
        "visible": false
      },
      {
        "name": "IsCoiThi",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "DaQuaLopSuPham",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "NgaySinh",
        "type": "nvarchar(20)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text001",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text002",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text003",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text004",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "Text005",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTrinhDoHocVan",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IsKhongChamCong",
        "type": "bit",
        "key": "",
        "visible": false
      },
      {
        "name": "IDToBoMonTmp",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "HSGV",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "HSGVTH",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "SoTietNghiaVu",
        "type": "decimal(18)",
        "key": "",
        "visible": false
      },
      {
        "name": "DiaChi",
        "type": "nvarchar(200)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDNhanSuHrm",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDTrinhDoGiangDayList",
        "type": "nvarchar(500)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChucDanhNS",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "Text006",
        "type": "nvarchar(MAX)",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChucDanh",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "IDChucVu",
        "type": "int",
        "key": "",
        "visible": false
      },
      {
        "name": "GhiChu",
        "type": "nvarchar(MAX)",
        "key": "",
        "visible": false
      }
    ],
    "relations": []
  }
];