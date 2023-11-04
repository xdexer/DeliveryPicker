FROM python:3.12
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt
RUN apt update
RUN apt install -y sqlite3
EXPOSE 8000
RUN python manage.py migrate
CMD python manage.py runserver 0.0.0.0:8000
