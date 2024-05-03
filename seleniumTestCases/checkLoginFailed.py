import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

class TestTakerAppTestCase(unittest.TestCase):
    def setUp(self):
        # Setup Chrome WebDriver
        options = Options()
        #user_data_dir = r"C:\Users\iqbal\AppData\Local\Google\Chrome\User Data\Default"
        #profile_dir = "iqbal32@gmail.com"  # Your profile name
        
        options.add_argument(f"user-data-dir={user_data_dir}")  # Path to your chrome user data
        options.add_argument(f"profile-directory={profile_dir}")  # Your profile
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        self.driver.get("https://automatic-palm-tree-x55j96pq55v9hvvqp-3000.app.github.dev") 
        self.driver.implicitly_wait(10)  # Wait up to 10 seconds for elements to become available

    def open_new_tab(self, url):
        self.driver.execute_script("window.open('');")  # Open a new tab
        self.driver.switch_to.window(self.driver.window_handles[-1])  # Switch to the new tab
        self.driver.get(url)  # Load the URL in the new tab

    def test_score_is_correct(self):
        print("Current URL:", self.driver.current_url)
        print("Page Source:", self.driver.page_source[:3000])  # prints the first 3000 characters of the page source
        
        # Open a new tab and perform actions there
        self.open_new_tab("https://automatic-palm-tree-x55j96pq55v9hvvqp-3000.app.github.dev")  # Change URL as needed for your test

        # Here you would continue with whatever test you need to perform in the new tab.
        # For demonstration, I'm going back to the original test actions:
        username_input = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//input[@type='text'][@placeholder='Username']"))
        )
        username_input.send_keys("Student")

        password_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='password'][@placeholder='Password']"))
        )
        password_input.send_keys("wrongPassword")

        login_button = self.driver.find_element(By.XPATH, "//button[text()='Login']")
        login_button.click()



        score_text = self.driver.find_element(By.CSS_SELECTOR, "p").text
        
        # Assertion to check 
        self.assertEqual(score_text, "Subject List", "Login")

    def tearDown(self):
        # Close the browser window
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
