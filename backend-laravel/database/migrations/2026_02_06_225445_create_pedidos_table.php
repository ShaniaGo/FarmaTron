<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_pedido', 20)->unique();

            // Relaciones
            $table->foreignId('cliente_id')->constrained('usuarios');
            $table->foreignId('farmacia_id')->constrained('farmacias');
            $table->foreignId('repartidor_id')->nullable()->constrained('usuarios');

            // Totales
            $table->decimal('subtotal', 10, 2);
            $table->decimal('descuento', 10, 2)->default(0.00);
            $table->decimal('costo_envio', 6, 2)->nullable();
            $table->decimal('impuestos', 10, 2)->nullable();
            $table->decimal('total', 10, 2);

            // Entrega
            $table->text('direccion_entrega');
            $table->string('telefono_contacto', 20)->nullable();
            $table->decimal('latitud_entrega', 10, 8)->nullable();
            $table->decimal('longitud_entrega', 11, 8)->nullable();
            $table->text('instrucciones_entrega')->nullable();
            $table->dateTime('fecha_entrega_estimada')->nullable();
            $table->dateTime('fecha_entrega_real')->nullable();

            // Estado
            $table->enum('estado', [
                'carrito', 'pendiente', 'confirmado', 'en_preparacion',
                'listo_recojo', 'asignado_repartidor', 'en_camino',
                'llegando', 'entregado', 'cancelado', 'rechazado'
            ])->default('carrito');
            $table->text('motivo_cancelacion')->nullable();

            // Pago
            $table->enum('metodo_pago', ['efectivo', 'pago movil', 'divisa', 'transferencia'])->default('efectivo');
            $table->enum('estado_pago', ['pendiente', 'pagado', 'fallido', 'reembolsado'])->default('pendiente');
            $table->string('comprobante_pago_url')->nullable();

            // Seguimiento
            $table->string('codigo_seguimiento', 50)->nullable();

            // Timestamps
            $table->timestamp('fecha_pedido')->useCurrent();
            $table->timestamp('fecha_actualizacion')->useCurrent()->useCurrentOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
