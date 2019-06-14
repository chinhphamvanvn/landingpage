import { Product } from './models/products.class';
import { Company } from './models/company.class';

import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { User } from './models/user.class';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LandingService } from './service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'icheck-ladipage';
  public user: User = new User();
  public screenWidth;
  public companys : Company[] = [];
  public products: Product[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public landingService: LandingService
    ){
    this.onResize();
  }

  ngOnInit(){
    //show modal
    setTimeout(function() {
      $('#modalContact').modal();
    }, 10000);

    this.createForm();
    this.createFormModal();
    this.landingService.getAllCompanys().subscribe(data=> {
      this.companys = data;
      console.log(this.companys);
    }, 
    error => {
      this.landingService.handleError(error);
    });

    this.landingService.getAllProducts().subscribe(data =>{
      this.products = data;
      console.log(this.products);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 415)
    {
      // console.log(this.screenWidth);
      this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
      this.companyhotConfig = {"slidesToShow": 2, "slidesToScroll": 1};
    }
    else if(this.screenWidth < 769)
    {
      // console.log(this.screenWidth);
      this.slideConfig = {"slidesToShow": 2, "slidesToScroll": 1};
      this.companyhotConfig = {"slidesToShow": 3, "slidesToScroll": 1};
    }
  }

  public frmUser : FormGroup;
  public frmUserModal: FormGroup;
  
  createForm(){
    this.frmUser = this._formBuilder.group({
      name : ['',[
        Validators.required,
        // Validators.minLength(4),
        // Validators.maxLength(25),
        Validators.pattern("[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ ]*")
      ]],
      phone : ['',[
        // Validators.minLength(10),
        // Validators.maxLength(10),
        Validators.pattern("[0-9]*")
      ]],
      email : ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]],
      content : ['']
    });
  }

  onSubmitForm()
  {
    this.user = {
      name : this.frmUser.value.name,
      email : this.frmUser.value.email,
      phone: this.frmUser.value.phone,
      content: this.frmUser.value.content,
      title: 'null',
      address: 'null'
    }

    this.landingService.addUser(this.user).subscribe(data =>{
      console.log(data);
      this.frmUser.reset();
      $("#myModal").modal('show');
      }, 
      error => {
        this.landingService.handleError(error);
      });
  }

  //Form modal
  createFormModal(){
    this.frmUserModal = this._formBuilder.group({
      name : ['',[
        Validators.required,
        // Validators.minLength(4),
        // Validators.maxLength(25),
        Validators.pattern("[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ ]*")
      ]],
      phone : ['',[
        // Validators.minLength(10),
        // Validators.maxLength(10),
        Validators.pattern("[0-9]*")
      ]],
      email : ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]],
      content : ['']
    });
  }

  onSubmitFormModal()
  {
    this.user = {
      name : this.frmUserModal.value.name,
      email : this.frmUserModal.value.email,
      phone: this.frmUserModal.value.phone,
      content: this.frmUserModal.value.content,
      title: 'null',
      address: 'null'
    }

    this.landingService.addUser(this.user).subscribe(data =>{
      console.log(data);
      this.frmUserModal.reset();
      $("#modalContact").modal('hide');
      $("#myModal").modal('show');
      }, 
      error => {
        this.landingService.handleError(error);
      });
  }

  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
  companyhotConfig = {"slidesToShow": 6, "slidesToScroll": 1};

  slides = [
    {
      img: "/assets/images/product/1.jpg",
      title: 'Nước hoa hồng dưỡng trắng da',
      price: 2500000
    },
    {
      img: "/assets/images/product/2.jpg",
      title: 'Nước hoa đào dưỡng trắng da',
      price: 2400000
    },
    {
      img: "/assets/images/product/3.jpg",
      title: 'Sữa rửa mặt dưỡng trắng da',
      price: 1500000
    },
    {
      img: "/assets/images/product/4.jpg",
      title: 'Kem tẩy mụn dưỡng trắng da',
      price: 900000
    },
    {
      img: "/assets/images/product/5.jpg",
      title: 'Sữa rửa mặt ABC',
      price: 6300000
    }
  ];
  

  benefits= [
    {
      id: 1,
      img : "/assets/images/benefit/1.png",
      title: 'Người tiêu dùng',
      content:[
        'Tra cứu thông tin sản phẩm mọi lúc mọi nơi',
        'Tích điểm - đổi quà hấp dẫn khi tham gia tương tác cùng iCheck',
        'Mua hàng qua iCheck với nhiều hình thức tiện lợi và chính sách hoàn tiền hấp dẫn',
        'Sử dụng điểm thưởng để mua hàng hoặc thanh toán các dịch vụ tiện ích'
      ],
      active: true
    },
    {
      id: 2,
      img : "/assets/images/benefit/2.png",
      title: 'Doanh nghiệp sản xuất, phân phối',
      content:[
        'Quảng bá cập nhật nhanh chóng hình ảnh thông tin sản phẩm – thông tin công ty',
        'Tương tác trực tiếp với người tiêu dùng',
        'Phong phú hình thức marketing - đúng đối tượng khách hàng',
        'Cập nhật nhanh chóng số liệu thống kê từ khách hàng với sản phẩm của doanh nghiệp',
        'Quản lý nhanh chóng cửa hàng đang phân phối sản phẩm của mình trên toàn quốc'
      ],
      active: false
    },
    {
      id: 3,
      img : "/assets/images/benefit/3.png",
      title: 'Doanh nghiệp phân phối, cửa hàng kinh doanh',
      content:[
        'Chỉ cần Quét là hoàn thiện việc đăng bán sản phẩm nhanh chóng',
        'Xác nhận đơn nhanh chóng - chính xác',
        'Thanh toán – đối soát thuận tiện',
        'Tương tác trực tiếp với khách hàng',
        'Phong phú hình thức marketing bán hàng tới đúng đối tượng khách hàng',
        'Tham gia nhiều chương trình ưu đãi từ Icheck',
        'Tiếp cận – thu hút lượng khách hàng Offline lớn'
      ],
      active: false
    }
  ];

  activeBenefit(id){
    console.log(typeof(id));
    this.benefits.map(item => {
      if(item.id == id)
      {
        item.active = true;
      }
      else{
        item.active = false;
      }
    });
    console.log(this.benefits);
  }

  howtobuys= [
    {
      img: "/assets/images/howtobuy/1.png"
    },
    {
      img: "/assets/images/howtobuy/2.png"
    },
    {
      img: "/assets/images/howtobuy/3.png"
    }
  ];
  HowtoBuyConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true};

  // company hot

companyhot = [
    {
      img: "/assets/images/company/1.png"
    },
    {
      img: "/assets/images/company/2.png"
    },
    {
      img: "/assets/images/company/3.png"
    },
    {
      img: "/assets/images/company/4.png"
    },
    {
      img: "/assets/images/company/5.png"
    },
    {
      img: "/assets/images/company/6.png"
    }
  ];

  //guest review
guestreivew = [
    {
      logo : "/assets/images/guestreview/1.png",
      content: "Trước đây, khách hàng mua sản phẩm kính mắt của công ty nhưng không biết được nhiều thông tin về sản phẩm cũng như thông tin của công ty Hào Phát. Từ khi Hào Phát đăng ký dịch vụ Truy xuất thông tin của iCheck, công ty có thể show cho khách hàng một lượng thông tin nhiều hơn, từ đó tiết kiệm được nhiều chi phí truyền thông.",
      name: "Công ty Cổ phần SỮA SỨC SỐNG VIỆT NAM"
    },
    {
      logo : "/assets/images/guestreview/2.png",
      content: "Công ty mình đang sử dụng tem chống tràn hàng của iCheck để quản lý sản phẩm tại các đại lý. Hệ thống đi kèm loại tem này quả thực rất tuyệt vời, cho dù ở bất cứ địa điểm nào mình cũng kiểm tra được đường đi hàng hóa, nhờ vậy mà tiết kiệm được khá nhiều chi phí không cần thiết.",
      name: "Công ty TNHH MẮT KÍNH TRƯƠNG HÀO PHÁT"
    },
    {
      logo : "/assets/images/guestreview/3.png",
      content: "Sản phẩm do công ty mình sản xuất bị làm giả rất nhiều, từ khi sử dụng tem xác thực iCheck cho sản phẩm, tình trạng làm giả giảm thiểu đáng kể, công ty có thể yên tâm kinh doanh và khách hàng cũng tin tưởng sản phẩm của công ty nhiều hơn.",
      name: "Công ty TNHH ĐẠI HẢI THÔNG"
    },
    {
      logo : "/assets/images/guestreview/4.png",
      content: "Dịch vụ đăng ký mã vạch tại iCheck giúp công ty chúng tôi tiết kiệm được rất nhiều thời gian và công sức, thay vì phải trực tiếp chờ đợi và tiến hành các thủ tục tại GS1.",
      name: "Công ty Cổ phần ANOVA MILK"
    }
  ]
}
