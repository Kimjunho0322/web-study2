module.exports = function(sequelize, DataTypes){
    return sequelize.define('users',{ //반환하는 함수 테이블 이름은 users
        idx: {
            type:DataTypes.INTEGER,  //데이터 타입은 정수형
            autoIncrement:true, //자동으로 숫자 증가(식별을 위해)
            primaryKey:true, //식별 프라이머리 키
            allwNull:false //인덱스 값이 생성 안되면 생성을 멈춤
        },
        user_id: {
            type:DataTypes.STRING(250), //데이터 타입 문자열 (최대 250)
            
        }
    })
}