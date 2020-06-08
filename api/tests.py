from django.test import TestCase, SimpleTestCase
from api.services import send_email, threaded
# Create your tests here.

class EmailTestCase(SimpleTestCase):
    def test_email_send(self):
        e = send_email("1016974398@qq.com", subject='test', content='test')
        self.assertIsNone(e)

class ThreadTestCase(SimpleTestCase):
    def test_threaded_decorator(self):
        @threaded()
        def return_n_str_list(n, _str="default_str"):
            return [_str for i in range(n)]

        task = return_n_str_list(2, _str="test")
        result = task.result()
        self.assertEqual(result, ["test", "test"])
