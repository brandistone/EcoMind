from api.models import User
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)  # First name field
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirmPassword = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["first_name", "email", "password", "confirmPassword"]
        extra_kwargs = {
            "password": {"write_only": True},
            "confirmPassword": {"write_only": True},
        }

    def validate(self, data):
        # Ensure passwords match
        if data["password"] != data["confirmPassword"]:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # Check if 'name' exists in validated_data
        first_name = validated_data.get('first_name', '')  # Default to an empty string if 'name' is not present
        validated_data.pop("confirmPassword")  # Remove confirmPassword before saving
        print("Name",first_name)
        user = User.objects.create_user(
            username=validated_data["email"],  # Use email as the username
            first_name=first_name,  # Store name as first_name
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user               
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Get the default token
        token = super().get_token(user)
        
        return token
    
    def validate(self, attrs):
        # Get the default validation data
        try:
            # Attempt default validation
            data = super().validate(attrs)
        except (InvalidToken, TokenError) as e:
            # Custom error handling
            raise serializers.ValidationError({
                'status': 'error',
                'message': 'Invalid credentials',
                'details': str(e)
            })
        
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  



