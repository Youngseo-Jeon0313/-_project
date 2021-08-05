import {React, useState} from 'react';
import axios from "axios";
import { API_URL } from "../config/constants";
import './index.css';
import {Form, Upload, Divider, Input, Button} from 'antd';


function StudentPage() {


      const [imageUrl, setImageUrl] = useState(null);
      const onSubmit = (values) => {
        axios.post(`${API_URL}/contents`,{
          imageUrl: imageUrl,
          description: values.description,
          pageandnum: values.pageandnum,
          date: values.date
        })
        .then((result)=> {
          console.log(result);
        });
      };

      const onChangeImage = (info) => {
        if (info.file.status === "uploading") {
          return;
        }
        if(info.file.status === "done") {
          const response = info.file.response;
          const imageUrl = response.imageUrl;
          setImageUrl(imageUrl);
        }
      };

     // --> 이 위에 있는 거는 일단 서버에서 가져온 거 쓰는 건데 일단은 보류 시키고 
  
      return (
       <div>
         <body>
           <div> 
             <Form name='질문 업로드' onFinish={onSubmit}>
              <Form.Item 
                name="upload"
                label={<div className="upload-label">질문 사진</div>}>
                <Upload
                  name="image"
                  action={`${API_URL}/image`}
                  listType="picture"
                  showUploadList={false}
                  onChange={onChangeImage}
                  >
                    {imageUrl ? (
                      <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="profile" />
                    ):(
                      <div id="upload-img-placeholder">
                        <img src="../images/camera.png" alt="profile"/>
                        <span>질문 사진을 업로드해주세요.</span>
                      </div>
                    )}
                </Upload>
                <Divider />
                <Form.Item
                  label={<div className="upload-label">질문하는 날짜</div>}
                  name="date"
                  rules={[{required: true, message: "질문 날짜를 입력해주세요"}]}>
                      <Input
                        className="upload-pageandnum"
                        size="large"
                        placeholder="질문하는 날짜를 입력해주세요"/>
                </Form.Item>
                <Divider/>
                <Form.Item
                  label={<div className="upload-label">질문하는 문제</div>}
                  name="pageandnum"
                  rules={[{required: true, message: "질문 책/페이지/문제번호를 입력해주세요"}]}>
                      <Input
                        className="upload-pageandnum"
                        size="large"
                        placeholder="질문하는 책, 페이지, 문제번호를 입력해주세요"/>
                </Form.Item>
                <Divider/>
                <Form.Item
                  name="description"
                  label={<div className="upload-label">질문할 내용</div>}
                  rules={[{required: true, message:"질문 내용을 적어주세요."}]}>
                  <Input.TextArea
                    size="large"
                    id="description"
                    showCount
                    maxLength={300}
                    placeholder="질문하고자 하는 내용을 적어주세요."
                  />
                </Form.Item>
              </Form.Item>
              <Button id="submit-button" size="large" htmlType="submit">
                문제 등록하기!
              </Button>
             </Form>
             
          </div>
           
            <div>
              <span>하고 싶은 작업을 밑에서 선택하세요</span>
            </div>
            <li><a href="./question">질문 올리기</a></li>
            <li><a href="/studydiary">그날그날 공부일기</a></li>
            <li><a href="/moto">오늘의 글귀 적어보기</a></li>
          </body>
        </div>
      );
  
  }

export default StudentPage;






