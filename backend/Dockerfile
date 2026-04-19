# Use Java 17 
FROM eclipse-temurin:17-jdk

# Working directory
WORKDIR /app

# Copy everything
COPY . .

# Build 
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Run 
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]