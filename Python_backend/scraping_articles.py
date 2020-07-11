import newspaper
import nltk
import pymysql
import json
from datetime import datetime
from langdetect import detect 

class news_curation:
    def __init__(self):
        self.news_data = []
        
    def scrape_newspaper(self):

        def check_keyword(words_list, keyword_list):
            for word in words_list:
                for keyword in keyword_list:
                    if keyword == word:
                        return True
            return False


        news_sites_url = ["https://www.timesnownews.com/", "https://www.thehindu.com/", "https://www.hindustantimes.com/", "https://www.dailypioneer.com/"]
        articles_object = []
        covid_articles = []


        for url in news_sites_url:
            news = newspaper.build(url)

            for article in news.articles:
                articles_object.append(article)
                
        for article in articles_object:
            url = article.url
            if check_keyword(url.split("-"), ["covid", "coronavirus", "corona", "covid-19", "covid19"]):
                covid_articles.append(article)
        
        for article in articles_object:
            try:
                article.download()
                article.parse()
                article.nlp()
                
                
                
                title = article.title
                text = article.text[:700]+"...."
                publish_date = article.publish_date #
                img_url = article.top_image
                post_url = article.url
                if(title is None or text in [None, " ",""] or publish_date is None or img_url is None):
                    continue
                if(detect(title) == "en"):
                    news_diction = {}
                    
                    print("Title:"+"    "+title)
                    print("Image-URL:"+"    "+img_url)
                    print("Publshed on:"+"  "+publish_date.strftime("%d %b %Y"))
                    print("=============================================")
                    print(text+"...")
                    print("=============================================")
                    
                    
                    news_diction['title'] = title
                    news_diction['body'] = text
                    news_diction['imgurl'] = img_url
                    news_diction['posturl'] = post_url
                    news_diction['postDate'] = publish_date.strftime("%d %b %Y")
                    
                    self.news_data.append(news_diction)
                        
            except:
                continue
     


    def inserting_predict_data_to_database(self):

        #Loading the credentials file that has host URL, username, password of database server
        with open('./database_credentials.json') as p:
            cred = json.load(p)
            
        db = pymysql.connect(cred["host"],cred["user"],cred["password"],cred["dbname"])
        cursor = db.cursor()
        print(len(self.news_data))
        for di in self.news_data:
            
            sql = f"INSERT INTO NEWS(HEADLINE, \
            BODY, IMGURL, POSTURL, POSTED) \
            VALUES ( '{di['title']}', '{di['body']}', '{di['imgurl']}', '{di['posturl']}', '{di['postDate']}')"
            
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                continue

        db.close()

if __name__=="__main__":
    news = news_curation()
    news.scrape_newspaper()
    news.inserting_predict_data_to_database()
