using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.Localization;

namespace demo10.Validation
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class VeeValidateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            => ValidationResult.Success;
    }

    public class VeeValidateAttributeAdapter : AttributeAdapterBase<VeeValidateAttribute>
    {
        public VeeValidateAttributeAdapter(VeeValidateAttribute attribute, IStringLocalizer stringLocalizer) : base(attribute, stringLocalizer) { }

        public override void AddValidation(ClientModelValidationContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var elementName = context.Attributes["name"];
            var attributeValue = $"aspnet:{elementName}";

            // Special handling for required rule. Needs to be a part of the base rule definition
            // of the v-validate attribute
            var isRequired = context.Attributes.ContainsKey("data-val-required");
            attributeValue = isRequired ? $"required|{attributeValue}" : attributeValue;

            MergeAttribute(context.Attributes, "v-validate", $"'{attributeValue}'");
        }

        public override string GetErrorMessage(ModelValidationContextBase validationContext)
            => GetErrorMessage(validationContext.ModelMetadata, validationContext.ModelMetadata.GetDisplayName());
    }

    public class VeeValidateAttributeAdapterProvider : IValidationAttributeAdapterProvider
    {
        IValidationAttributeAdapterProvider baseProvider = new ValidationAttributeAdapterProvider();
        public IAttributeAdapter GetAttributeAdapter(ValidationAttribute attribute, IStringLocalizer stringLocalizer)
        {
            if (attribute is VeeValidateAttribute)
                return new VeeValidateAttributeAdapter(attribute as VeeValidateAttribute, stringLocalizer);
            return baseProvider.GetAttributeAdapter(attribute, stringLocalizer);
        }
    }
}