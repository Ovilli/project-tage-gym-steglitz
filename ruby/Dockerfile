FROM ruby:3.3-slim
ENV RACK_ENV=production
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
  && rm -rf /var/lib/apt/lists/*
COPY ruby/Gemfile ./
RUN bundle install
COPY ruby/app.rb ./app.rb
COPY public ./public
RUN mkdir -p /app/data
EXPOSE 3000
ENV PORT=3000 DB_PATH=/app/data/showcase.db PUBLIC_DIR=/app/public
CMD ["ruby", "app.rb"]
