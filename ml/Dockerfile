FROM python:3.10-slim

# Install dependencies (if needed)
RUN apt-get update && apt-get install -y curl gnupg

# Optional: Install Ollama (if you're using Ollama inside container)
# RUN curl -fsSL https://ollama.com/install.sh | sh
# RUN ollama pull llama3

WORKDIR /app
COPY . .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python3", "ml_api.py"]
