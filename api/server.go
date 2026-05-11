package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

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

func getDBConnection() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)
}

func getPosts(c *gin.Context) {
	fname := "%" + c.DefaultQuery("fname", "") + "%"
	Time := c.DefaultQuery("Time", "1970-01-01 00:00:00")
	EndTime := c.DefaultQuery("EndTime", "2038-01-12 03:14:07")
	Country := "%" + c.DefaultQuery("Country", "") + "%"
	City := "%" + c.DefaultQuery("City", "") + "%"
	State := "%" + c.DefaultQuery("State", "") + "%"
	Title := "%" + c.DefaultQuery("Title", "") + "%"
	Msg := "%" + c.DefaultQuery("Msg", "") + "%"

	db, err := sql.Open("mysql", getDBConnection())
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to connect to database"})
		return
	}
	defer db.Close()

	query := "SELECT * FROM POST WHERE Name LIKE ? AND Title LIKE ? AND created_at BETWEEN ? AND ? AND Message LIKE ? AND City LIKE ? AND State LIKE ? AND Country LIKE ?"
	result, err := db.Query(query, fname, Title, Time, EndTime, Msg, City, State, Country)
	if err != nil {
		c.JSON(500, gin.H{"error": "Query failed"})
		return
	}
	defer result.Close()

	var posts []Post
	for result.Next() {
		var post Post
		err = result.Scan(&post.ID, &post.Name, &post.Title, &post.Created_at, &post.Message, &post.City, &post.State, &post.Country)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to scan row"})
			return
		}
		posts = append(posts, post)
	}

	c.JSON(200, gin.H{"data": posts})
}

func createPost(c *gin.Context) {
	var body struct {
		Name    string `json:"Name"`
		Title   string `json:"Title"`
		Message string `json:"Message"`
		City    string `json:"City"`
		State   string `json:"State"`
		Country string `json:"Country"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	db, err := sql.Open("mysql", getDBConnection())
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to connect to database"})
		return
	}
	defer db.Close()

	query := "INSERT INTO POST (Name, Title, Message, City, State, Country) VALUES (?, ?, ?, ?, ?, ?)"
	_, err = db.Exec(query, body.Name, body.Title, body.Message, body.City, body.State, body.Country)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to insert post"})
		return
	}

	c.JSON(201, gin.H{"message": "Post created"})
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	router := gin.Default()
	router.GET("/users", getPosts)
	router.POST("/store-data", createPost)

	router.Run(os.Getenv("SERVER_ADDRESS"))
}
