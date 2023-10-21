from datetime import datetime
import sys
# Add the path of the directory containing the theguardian module to sys.path
# Replace 'path_to_theguardian_module' with the actual path to the module's directory
sys.path.append('theguardian-api-python')
from theguardian import theguardian_content
import requests

# Filter function to remove unwanted content
unwanted_keywords = ["football", "society","fashion","music","lifeandstyle","environment","media","tv-and-radio","film"]
def filter_function(content):
    title = content.get('webTitle', '').lower()
    section = content.get('sectionName', '').lower()
    for keyword in unwanted_keywords:
        if keyword in title or keyword in section:
            return False
    return True

def get_content(fromdate, todate, keyword, api_key):
    """
    Fetches and filters articles from The Guardian based on given criteria.
    
    Parameters:
    - fromdate (str): The start date in the format "YYYY-MM-DD" to fetch articles from. 
    - todate (str): The end date in the format "YYYY-MM-DD" to fetch articles until.
    - keyword (str): A keyword or phrase to search within the articles.
                     If left empty, it will fetch articles without a specific keyword filter.
    - api_key (str): Your API key provided by The Guardian.

    Returns:
    - List[Dict]: A filtered list of articles from The Guardian. Each article 
                  is represented as a dictionary with details like title, URL, etc.

    Description:
    The function fetches articles from The Guardian's "world" section within 
    the specified date range and containing the given keyword. The fetched articles 
    are then filtered to exclude those with certain unwanted keywords or from unwanted sections.
    """
    
    # Set up query parameters
    params = {
        "section" : "world",
        "from-date": fromdate,
        "to-date": todate,
        "q": keyword,
        "api-key": api_key,
        "page-size": 50
    }


    
    # Create the Content instance with the specified parameters
    content = theguardian_content.Content(api=api_key, **params)

    # Get content response
    json_content = content.get_content_response()

    # Extract results from the response
    results = content.get_results(json_content)

    # Apply the filter to the results
    filtered_results = list(filter(filter_function, results))
    
    return filtered_results


def fetch_article_content(api_key, endpoint):
    # Construct the full URL with the API key
    url = f"{endpoint}?api-key={api_key}&show-fields=body"
    
    # Make the GET request to the API
    response = requests.get(url)
    
    # If the request was successful, extract and return the article content
    if response.status_code == 200:
        data = response.json()
        return data["response"]["content"]["fields"]["body"]
    else:
        return f"Error {response.status_code}: Unable to fetch the article."