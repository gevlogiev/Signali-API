import { useState, useContext } from "react";
import * as signalService from "../services/signalService"
import CategoryContext from "../contexts/CategoryContext";
import Swal from 'sweetalert2'
import Footer from "../components/Footer";

export default function Tracking() {


  const { categories } = useContext(CategoryContext)

  const [readySubmit, setReadySubmit] = useState(false);
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    topic: '',
    category: '',
    text: '',
    file1: file1,
    file2: file2,
    file3: file3,
    termsAgreed: false,

  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    topic: '',
    category: '',
    text: '',
    termsAgreed: false,
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleFileChange = (e) => {

    const filename = e.target.files[0].name;
    const regex = /(?:^|_)cb(\d+)(?:_|\.|\s)/;
    const matches = filename.match(regex);
    const cbNumber = matches ? matches[1] : null;
    let name = e.target.name;

    if (name == 'file1') {
      setFile1(e.target.files[0]);
      setFormData({
        ...formData, file1: e.target.files[0]
      })

    } else if (name == 'file2') {

      setFile2(e.target.files[0]);

      formData.file2 = e.target.files[0]

    } else {

      setFile3(e.target.files[0]);
      formData.file3 = e.target.files[0]

    }


  }



  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      termsAgreed: event.target.checked
    });
  };



  const handleTopicChange = (event) => {
    setFormData({
      ...formData,
      topic: event.target.value
    });
  };


  const handleCategotyChange = (event) => {
    setFormData({
      ...formData,
      category: event.target.value
    });
  };

  // Event handler for form submission
  const handleSubmit = (event) => {

    const values = Object.keys(formData)
      .filter(key => key !== 'file1' && key !== 'file2' && key !== 'file3')
      .map(key => formData[key]);

    if (values.some(value => value === null || value === undefined || value === '')) {
      Swal.fire({
        icon: "error",
        title: "Грешка",
        text: "Всички полета трябва да са попълнени",
      });
      return;
    }

    const NewFormaData = new FormData();
    for (let key in formData) {
      NewFormaData.append(key, formData[key]);
    }


    event.preventDefault();
    signalService.externalSignalCreate(NewFormaData)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onBlurHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName == 'name') {

      if (fieldValue.length <= 3) {
        setErrors(state => ({
          ...state,
          name: 'Името трябва да бъде поне 3 символа!'
        }))
        setReadySubmit(true);

      } else {
        setErrors(state => ({
          ...state,
          name: ''
        }))
        setReadySubmit(false);

      }
    }
  }

  const cleanFile = (e) => {
    return
  }

  return (
    <>
      <div className="w-100 home-img">
        <p className="img-text">Подаване на сигнали, жалби и предложения по електронен път.</p>
        <img src="../../public/assets/img/22.jpg" alt="" srcSet="" />
      </div>
      <main id="main" className="main m-2">
        <section className="section justify-content-center">
          <div className="row justify-content-center">
            <div className="col-lg-5">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Данни за лицето подало сигнал</h5>


                  <form>
                    <div className="d-flex flew-wrap mb-3">
                      <label htmlFor="inputText" className="col-sm-3 col-form-label">Име</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} onBlur={onBlurHandler} />
                        <small className="text-danger">{errors.name}</small>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Телефон</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                      </div>
                    </div>
                    <hr />
                    <h5 className="card-title">Данни за сигнала</h5>

                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Местонахожение</label>
                      <div className="col-sm-9 mb-3">
                        <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} />
                      </div>


                      <label className="col-sm-3 col-form-label">Тема</label>
                      <div className="col-sm-9 mb-3">
                        <select className="form-select" name="topic" value={formData.topic} onChange={handleTopicChange}>
                          <option disabled value="" >Тема</option>
                          <option value="1">Сигнал</option>
                          <option value="2">Похвала</option>
                          <option value="3">Предложение</option>
                        </select>
                      </div>



                      <label className="col-sm-3 col-form-label">Категория</label>
                      <div className="col-sm-9">
                        <select className="form-select" name="category" value={formData.category} onChange={handleCategotyChange}>
                          <option disabled value="">Изберете категория</option>

                          {categories.map((category, index) => (

                            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>

                          ))}

                        </select>
                      </div>


                      <div className="mb-3">
                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Описание на сигнала</label>
                        <div className="w-100">
                          <textarea className="form-control" type="text" name="text" rows={5} value={formData.text} onChange={handleInputChange} > </textarea>
                          <p className="form-text text-muted">
                            Моля, попълнете своето описание с подробности.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h5 className="card-title">Прикачване на файлове</h5>



                    <div className=" mb-3  d-flex gap-3">
                      {/* <button disabled={file1 == null ? true : false}
                      className={file1 == null && "btn btn-primary cursor-not-allowed mb-4"}
                      //onClick={handleFileUpload}
                    >Качване на файл 
                    </button> */}

                      <div className="btn btn-primary cursor-not-allowed ">
                        <label className="w-full flex items-center justify-center h-full text-white font-bold rounded" htmlFor={1}  >{formData.file1?.name ? "Подмени файл" : "Изберете файл"} </label>
                        <input className="d-none" id="1" type="file" name="file1" onChange={handleFileChange} />
                      </div>
                      {formData.file1 &&
                        <div className="d-flex align-items-center">
                          <input type="text" disabled className="btn btn-secondary cursor-not-allowed " value={`${formData.file1?.name}`} />
                          <input className="bg-white border-0" type="button" value="❌" onClick={e => { setFormData(state => ({ ...state, file1: null })) }} />
                        </div>
                      }

                    </div>
                    {formData.file1 &&
                      <div className=" mb-3 d-flex">
                        <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Добавяне на файл</label>
                        <div className="col-sm-8">
                          <input className="form-control" type="file" id="formFile" name='file2' onChange={handleFileChange} />
                        </div>
                      </div>
                    }
                    {formData.file1 && formData.file2 &&
                      <div className=" mb-3 d-flex">
                        <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Добавяне на файл</label>
                        <div className="col-sm-8">
                          <input className="form-control" type="file" id="formFile" name='file3' onChange={handleFileChange} />
                        </div>
                      </div>
                    }

                    <span className="form-text text-muted">
                      Поддържани формати : pdf,jpg,doc,docx,png,jpeg, максимален размер на всеки файл: 7MB.
                    </span>

                    <hr />
                    <div className="mb-3">
                      <div className="w-100">
                        <div className="form-check">
                          <input className="form-check-input fs-5 border-2" type="checkbox" id="gridCheck1" checked={formData.termsAgreed} onChange={handleCheckboxChange} />
                          <label className="form-text  text-muted" htmlFor="gridCheck1">
                            Информиран съм, че предоставените от мен данни, са защитени по смисъла на Регламент (ЕС) 2016/679 на Европейския парламент и на Съвета от 27 април 2016 и ще бъдат използвани само и единствено с цел изпълнение на произтичащите законови задължения във връзка с обработка на информацията, съдържаща се в жалбата, сигнала, предложението или други въпроси. Личните данни не се използват повторно за несъвместими цели. Община Варна се задължава да ги пази и да не ги предоставя без законово основание на трети лица..
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-sm-10">
                        <input disabled={readySubmit} type="button" onClick={(e) => handleSubmit(e)} className="btn btn-primary" value="Изпращане на сигнал"></input>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>

  )
}