package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB
var err error

type User struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Address string `json:"address"`
}
type Data struct {
	Data interface{} `json:"data"`
}

func Requests() {
	log.Println("Start server at http://127.0.0.1:9999")
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/api/customer", createUser).Methods("POST")
	myRouter.HandleFunc("/api/customers", GetUser).Methods("GET")
	log.Fatal(http.ListenAndServe(":9999", myRouter))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	data, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(data, &user)
	db.Create(&user)
	res := Data{Data: user}
	result, err := json.Marshal(res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, http.StatusOK)
	w.Write(result)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	users := []User{}
	db.Find(&users)
	res := Data{Data: users}
	result, err := json.Marshal(res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(result)
}

func main() {
	db, err = gorm.Open("mysql", "root:marcotanawan@/go_crud?charset=utf8&parseTime=True")
	if err != nil {
		log.Println("Connection failed", err)
	} else {
		log.Println("Connection Success")
	}
	db.AutoMigrate(&User{})
	Requests()
}
