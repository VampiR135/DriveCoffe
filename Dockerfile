FROM python:3.7.5
ENV PYTHONUNBUFFERED 1
ENV C_FORCE_ROOT true
RUN mkdir /src
RUN mkdir /static
WORKDIR /src
ADD ./src /src

RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main' >  /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
RUN apt-get install -y build-essential python-all-dev
RUN apt-get install -y gdal-bin python-gdal
RUN apt-get install -y postgresql-client-10
RUN apt-get install -y libev-dev
RUN apt-get install -y locales-all

COPY src/requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
COPY . /tmp/

RUN pip install --upgrade pip
RUN ln -s /var/run/postgresql/.s.PGSQL.5432 /tmp/.s.PGSQL.5432
RUN export LC_ALL="en_US.UTF-8"
