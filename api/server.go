package main

import (
	"database/sql"
	_ "errors"
	"fmt"
	_ "net/http"

	"github.com/gin-gonic/gin"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	ID         string `json:"ID"`
	Name       string `json:"Name"`
	City       string `json:"City"`
	State      string `json:"State"`
	Country    string `json:"Country"`
	Title      string `json:"Title"`
	Message    string `json:"Message"`
	Created_at string `json:"created_at"`
}

func getPosts(c *gin.Context) {
	fname := "%" + c.Param("fname") + "%"
	Time := c.Param("Time")
	EndTime := c.Param("EndTime")
	Country := "%" + c.Param("Country") + "%"
	City := "%" + c.Param("City") + "%"
	State := "%" + c.Param("State") + "%"
	Title := "%" + c.Param("Title") + "%"
	Msg := "%" + c.Param("Msg") + "%"
	fmt.Println(fname)
	fmt.Println(Time)
	fmt.Println(EndTime)
	fmt.Println(Country)
	fmt.Println(City)
	fmt.Println(State)
	fmt.Println(Title)
	fmt.Println(Msg)
	if Time == "" {
		Time = "1970-01-01 00:00:00"
	}
	if EndTime == "" {
		EndTime = "2038-01-12 03:14:07"
	}
	// add to deb
	db, err := sql.Open("mysql", "root:your_current_password@tcp(127.0.0.1:3306)/capsule")

	if err != nil {
		panic(err.Error)
	}
	defer db.Close()

	sql := "SELECT * FROM POST WHERE Name LIKE " + "\"" + string(fname) + "\"" + " AND Title LIKE " + "\"" + string(Title) + "\"" + " AND created_at BETWEEN " + "\"" + string(Time) + "\"" + " AND " + "\"" + string(EndTime) + "\"" + " AND  Message LIKE " + "\"" + string(Msg) + "\"" + " AND City LIKE " + "\"" + string(City) + "\"" + " AND State LIKE " + "\"" + string(State) + "\"" + "AND Country LIKE " + "\"" + string(Country) + "\""
	fmt.Println(sql)

	result, err := db.Query(sql)
	if err != nil {
		panic(err.Error)
	}

	var posts []Post
	for result.Next() {

		var post Post
		err = result.Scan(&post.ID, &post.Name, &post.Title, &post.Created_at, &post.Message, &post.City, &post.State, &post.Country)
		fmt.Println(post)
		if err != nil {
			panic(err.Error)
		}

		posts = append(posts, post)

	}

	c.JSON(200, gin.H{
		"data": posts,
	})

	//return query

}

func createPost(c *gin.Context) {

	fname := c.Param("fname")
	Country := c.Param("Country")
	City := c.Param("City")
	State := c.Param("State")
	Title := c.Param("Title")
	Msg := c.Param("Msg")
	fmt.Println(fname)
	fmt.Println(Country)
	fmt.Println(City)
	fmt.Println(State)
	fmt.Println(Title)
	fmt.Println(Msg)

	// add to deb
	db, err := sql.Open("mysql", "root:your_current_password@tcp(127.0.0.1:3306)/capsule")

	if err != nil {
		panic(err.Error)
	}
	defer db.Close()

	sql := "INSERT INTO POST (Name, Title, Message, City, State, Country) VALUES ( \"" + string(fname) + "\", \"" + string(Title) + "\", \"" + string(Msg) + "\", \"" + string(City) + "\", \"" + string(State) + "\", \"" + string(Country) + "\")"
	fmt.Println(sql)

	insert, err := db.Query(sql)

	if err != nil {
		panic(err.Error)
	}

	defer insert.Close()
}

func main() {
	router := gin.Default()
	/**
		db, err := sql.Open("mysql", "root:your_current_password@tcp(127.0.0.1:3306)/testdb")

		if err != nil {
			panic(err.Error)
		}
		defer db.Close()
	**/
	router.GET("/users/:fname/:Time/:EndTime/:Country/:City/:State/:Title/:Msg/:View", getPosts)
	router.POST("/store-data/:fname/:Country/:City/:State/:Title/:Msg", createPost)

	router.Run("localhost:3000")
}
